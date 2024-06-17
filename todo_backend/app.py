from flask import Flask,request
from flask_cors import CORS,cross_origin
import json
from db import * 

app = Flask(__name__)
CORS(app)

'''@app.route("/")
def index():
    return "<p>Hello, World!</p>"'''

@app.route('/login/', methods=['POST'])
def login():
    username=request.json['username']
    password=request.json['password']
    token=valid(username,password)
    data={"token":token}
    return json.dumps(data)
    

@app.route("/register/", methods=['POST'])
def create_account():
    name=request.json['name']
    email=request.json['email']
    username=request.json['username']
    password=request.json['password']
    token=newuser(name,email,username,password)
    data={"token":token}
    return json.dumps(data)

@app.route("/profile/", methods=['POST'])
def get_details():
    token=request.headers['Authorization']
    return json.dumps(getdetails(token))


'''@app.route("/forgot_password")
def forgot_password():
    return "<p>Hello, World!</p>"'''

@app.route("/todo/", methods=['GET'])
def home():
    try:
        token=request.headers['Authorization']
        return json.dumps(getalltasks(token))
    except:
        return "invalid token"

@app.route("/todo/create/", methods=['POST'])
def add_task():
    token=request.headers['Authorization']
    title=request.json['title']
    task_id=addtask(title,token)
    data={"id":task_id,"title":title}
    return json.dumps(data)

@app.route("/todo/<int:id>/",methods=['DELETE'])
def remove_task(id):
    token=request.headers['Authorization']
    removetask(id,token)
    return "removed successfully"

@app.route("/todo/<int:id>/", methods=['PUT','PATCH'])
def edit_task(id):
    token=request.headers['Authorization']
    title=request.json['title']
    data={"id":id,"title":title}
    edittask(id,title,token)
    return json.dumps(data)

@app.route("/logout/")
def logout():
    token=request.headers['Authorization']
    removetoken(token)
    return "<p>Logged out</p>"


if(__name__=="__main__"):
    app.run()