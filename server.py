from http.cookiejar import unmatched
from re import Pattern, PatternError
from sys import flags

from flask import Flask, render_template, request
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField
import re
import random

from wtforms.fields.simple import SubmitField
from wtforms.validators import DataRequired

rand_num = random.randint(0,10)

app = Flask(__name__)
app.secret_key = "this is a secret key"

class MyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    submit = SubmitField(label='Go')



@app.route('/', methods=['POST', 'GET'])
def home():
    selected_option = ['ignore',]
    pattern_error = None
    ignore = None
    if request.method == 'GET':
        return render_template("index.html")
    else:
        regex_text = request.form['regex']

        sample_text = re.sub(r'^\s+', '', request.form['input'], flags=re.MULTILINE)

        input_list = [item for item in sample_text.split('\n') if len(item.strip()) > 0]
        groups_list = []
        matched_list = []
        unmatched_list = []
        for item in input_list:
            try:
                #print(item.strip())
                if request.form.get("checkbox") in selected_option:
                    ignore = True
                    pattern = re.compile(fr"{regex_text}", flags=re.IGNORECASE) #f string + r for specifying raw string for regex
                else:
                    ignore = False
                    pattern = re.compile(fr"{regex_text}")

                #print(pattern)
                match_obj = pattern.match(item.strip('\r'))
                #print(match_obj)
                all_groups = match_obj.groups()
                groups_list.append(all_groups)
                matched_list.append(item)
                #print(groups_list)
            except PatternError as pe:
                pattern_error = f"Pattern Error Message: {pe.msg}.\n POSITION:  {str(pe.pos)} , line number: {str(pe.lineno)} , column no: {str(pe.colno)} ."
            except AttributeError:
                groups_list.append(('Not matched',))
                unmatched_list.append(item)

        # print("input_list: ", input_list)
        # print("groups_list: ", groups_list)
        #return render_template("index.html")
        return render_template("index.html", r_text=regex_text, input=sample_text,
                               input_list=input_list, result_list=groups_list, matched_list=matched_list,
                               unmatched_list=unmatched_list, ignore=ignore, pattern_error=pattern_error)






# @app.route('/regex', methods=['POST'])
# def regex_test():
#     print('regex_test method called..')
#     f_userName = request.form["user-name"]
#     return render_template("index.html", name=f_userName)


if __name__ == "__main__":
    app.run(debug=True)