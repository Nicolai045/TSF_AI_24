from flask import request, jsonify
from config import app,db,socketio
from models import User

clients = {}

# Medlet einen Client auf dem Server ab.
@socketio.on('disconnect')
def on_disconnect():
    #clients.pop(request.sid,'No user found')
    #socketio.emit('current_users', clients)
    print("User disconnected!\nThe users are: ", clients)

#Meldet einen Client auf dem Server an.
@socketio.on('sign_in')
def user_sign_in():
    #clients[request.sid] = client_name['name']
    #socketio.emit('current_users', clients)
    print("New user sign in!\nThe users are: ", clients)

#TODO in socket umschreiben.
@app.route("/get_all_users",methods=["GET"])
def get_Users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users":json_users})

@app.route("/create_user",methods=["POST"])
def create_User():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    password = request.json.get("password")

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