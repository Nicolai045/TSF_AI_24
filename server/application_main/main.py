from flask import json, request, jsonify, session
from flask_socketio import send
from config import app,db,socketio
from models import User

clients = {}

# Medlet einen Client auf dem Server ab.
@socketio.on('disconnect')
def on_disconnect():
    #clients.pop(request.sid,'No user found')
    #socketio.emit('current_users', clients)
    print("User disconnected!\nThe users are: ", clients)

def emitResponse(eventId,infoMessage):
    socketio.emit('response',{'eventId':eventId ,'info':infoMessage})

@socketio.on('sign_in')
def sign_in(data):
    email = data['email']
    password = data['password']

    if not email or not password:
        emitResponse(400,'Please fill in all fields!')
    
    user = User.query.get({"email":email})

    if user is None:
        emitResponse(400,'Email does not exist!')
    
    if user['email'] is not password:
        emitResponse(400,'Password is not correct.')
    
    emitResponse(200,'Login Successfull')

#Meldet einen Client auf dem Server an.
@socketio.on('create_user')
def create_user(user):
    first_name = user['firstName']
    last_name = user['lastName']
    email = user['email']
    password = user['password']

    if not first_name or not last_name or not email or not password:
        emitResponse(400,'Please fill in all requested fields')

    new_user = User(first_name = first_name, last_name = last_name,email = email, password = password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as exception:
        emitResponse(400,exception)
    
    emitResponse(200,'User was created')

@app.route("/crud/login_user", methods=["POST"])
def login_user():
    data = request.json['data']
    email = data['email']
    password = data['password']

    if not email or not password:
        return jsonify({"message":"Please fill in all fields!"}),400
    
    user = db.session.query(User).filter_by(email=email).first()
    #print(user)

    if user is None:
        return jsonify({"message":"The requested email does not exist!"}),400
    
    print(user.password)
    if user.password != password:
        return jsonify({"message":"Password is not correct!"}),400
    
    return jsonify({"message":"Login Successfull"}),200


#TODO in socket umschreiben.
@app.route("/get_all_users",methods=["GET"])
def get_Users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users":json_users})

@app.route("/crud/create_user",methods=["POST"])
def create_User():
    data = request.json['data']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']
    password = data['password']

    if not first_name or not last_name or not email or not password:
        return (jsonify({"message":"You must include a first name, last name, email and password"}),
                400,
                )
    
    new_user = User(first_name = first_name, last_name = last_name,email = email, password = password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as exception:
        return jsonify({"message":str(exception)}),400
    
    return jsonify({"message":"User created!"}),201

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message":"user not found"}), 404
    
    data = request.json
    user.first_name = data.get("firstName",user.first_name)
    user.last_name = data.get("lastName",user.last_name)
    user.email = data.get("email",user.email)
    user.password = data.get("password",user.password)

    db.session.commit()

    return jsonify({"message":"User Updated"}),200

@app.route("/delete_user/<int:user_id>",methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message":"User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message":"User deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    socketio.run(app,host="127.0.0.1",port=4600,debug=True)