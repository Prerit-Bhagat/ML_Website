from flask import Flask,render_template,request,flash
import joblib
import pandas as pd
import numpy as np
app = Flask(__name__, static_url_path='/static')
app.config["SECRET_KEY"]="secret_key"

model = joblib.load("model.joblib")


# @app.route('/home',methods=['GET','POST'])
# def home():
#     # return "Helo"
#     return render_template('index.html',title='home')

@app.route('/')
@app.route('/index.html')
def Hello():

    return render_template('index.html')

@app.route('/calculate.html',methods=['GET','POST'])
def calculate():
    pred='0'
    if request.method == "POST":
        try:
            snoring_range = float(request.form.get("snoring_range"))
            respiration_rate = float(request.form.get("respiration_rate"))
            temprature= float(request.form.get("temperature"))
            blood_oxygen=float( request.form.get("blood_oxygen"))
            sleep= float(request.form.get("sleep"))
            heart_rate = float(request.form.get("heart_rate"))
            arr=np.array([snoring_range,respiration_rate,temprature,blood_oxygen,sleep,heart_rate])
            arr=arr.reshape(1,-1)
            pred=model.predict(arr)
            pred=pred[0]
        except Exception as e:
            flash(f"An error occurred: {e}", "error")
        
    
    return render_template('calculate.html',prediction=pred)


if __name__=='__main__':
    app.run(debug=True)