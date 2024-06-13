import mysql.connector
import secrets
import string

mydb = mysql.connector.connect(
	host = "localhost",
	user = "root",
	password = ""
)

cursor = mydb.cursor()
cursor.execute("USE todo_db")



def gen_token(num_chars,user_id):
    alphabet = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(alphabet) for _ in range(num_chars))
    return "UID"+str(user_id)+token


def valid(username,password):
	cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
	res=cursor.fetchall()
	if(len(res)):
		if(res[0][4]==password):
			token=gen_token(16,res[0][0])
			cursor.execute("SELECT * FROM activetokens WHERE user_id = %s", (res[0][0],))
			token_res=cursor.fetchall()
			if(len(token_res)):
				cursor.execute("UPDATE activetokens SET token = %s WHERE user_id = %s",(token,res[0][0]))
			else:
				cursor.execute("INSERT INTO activetokens (user_id,token) VALUES (%s, %s)",(res[0][0],token))
			mydb.commit()
			return token
	else:
		return False
	

def newuser(name,email,username,password):
	cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
	res=cursor.fetchall()
	if(len(res)):
		return False
	else:
		cursor.execute("INSERT INTO users (name,email,username, password) VALUES (%s, %s,%s, %s)",(name,email,username,password))
		mydb.commit()
		return valid(username,password)
	

def getdetails(token):
	cursor.execute("select user_id from activetokens where token = %s",(token,))
	user_id=cursor.fetchone()[0]
	cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
	res=cursor.fetchall()[0]
	list=[]
	user_id=res[0]
	name=res[1]
	email=res[2]
	username=res[3]
	data={
		"user_id":user_id,
		"name":name,
		"email":email,
		"username":username
	}
	list.append(data)
	return list

def getalltasks(token):
	cursor.execute("select user_id from activetokens where token = %s",(token,))
	user_id=cursor.fetchone()[0]
	cursor.execute("select * from tasks where user_id=%s",(user_id,))
	res=cursor.fetchall()
	list=[]
	for task in res:
		task_id=task[0]
		title=task[2]
		status=task[3]
		data={
			"task_id":task_id,
			"title":title,
			"status":status
		}
		list.append(data)
	return list

def edittask(task_id,title,token):
	cursor.execute("select user_id from activetokens where token = %s",(token,))
	user_id_token=cursor.fetchone()[0]
	cursor.execute("select user_id from tasks where task_id=%s",(task_id,))
	user_id_task=cursor.fetchone()[0]
	if(user_id_token==user_id_task):
		cursor.execute("UPDATE tasks SET task_name = %s WHERE task_id = %s",(title,task_id))
		mydb.commit()

def removetask(task_id,token):
	cursor.execute("select user_id from activetokens where token = %s",(token,))
	user_id_token=cursor.fetchone()[0]
	cursor.execute("select user_id from tasks where task_id=%s",(task_id,))
	user_id_task=cursor.fetchone()[0]
	if(user_id_token==user_id_task):
		cursor.execute("DELETE FROM tasks WHERE task_id= %s",(task_id,))
		mydb.commit()


def addtask(title,token):
	cursor.execute("select user_id from activetokens where token = %s",(token,))
	user_id=cursor.fetchone()[0]
	cursor.execute("INSERT INTO tasks (user_id,task_name) VALUES (%s,%s)",(user_id,title))
	cursor.execute("SELECT LAST_INSERT_ID();")
	task_id=cursor.fetchone()[0]
	mydb.commit()
	return task_id
	

def removetoken(token):
	cursor.execute("DELETE FROM activetokens WHERE token= %s",(token,))
