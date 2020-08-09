from flask import Flask, request, jsonify, redirect
from flask_mysqldb import MySQL
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies)


app = Flask(__name__)

# Configure db

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_DB'] = 'myAssignment'

app.config['JWT_SECRET_KEY'] = 'shfjkdf'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config['JWT_REFRESH_COOKIE_PATH'] = '/token/refresh'
app.config['JWT_COOKIE_SECURE'] = True
app.config['JWT_COOKIE_CSRF_PROTECT'] = True


mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

@app.route('/api/signup', methods=['POST'])
def signup():
    name = request.get_json()['name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user2 WHERE email = '" + str(email) + "'")
    rv = cur.fetchone()
    if rv:
        return 'Email already in use', 400

    cur.execute('INSERT INTO user2 (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
    mysql.connection.commit()
    cur.close()

    user = {
		'name' : name,
		'email' : email,
		'password' : password
    }
    return jsonify({'user' : user})


@app.route('/api/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM user2 where email = '" + str(email) + "'")
    rv = cur.fetchone()
    if not rv:
        return 'Email not registered', 400

    if bcrypt.check_password_hash(rv['password'], password):
       access_token = create_access_token(identity = email)
       refresh_token = create_refresh_token(identity = email)
       result = jsonify({'token': access_token})
       set_access_cookies(result, access_token)
       set_refresh_cookies(result, refresh_token)    
    else:
        result = 'Email and Password Invalid', 400

    return result

@app.route('/token/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200


@app.route('/api/logout', methods=['GET'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    print('run')
    return resp, 200  


@app.route('/api/register', methods=['POST'])
def index():
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    phone = request.get_json()['phone']
    company_name = request.get_json()['company_name']
    website_url = request.get_json()['website_url']
    country = request.get_json()['country']
    city = request.get_json()['city']
    fund_raised = request.get_json()['fund_raised']
    company_type = request.get_json()['company_type']
    company_est = request.get_json()['company_est']
    isWorking = request.get_json()['isWorking']
    co_first_name = request.get_json()['co_first_name']
    co_last_name = request.get_json()['co_last_name']
    co_email = request.get_json()['co_email']
    co_phone = request.get_json()['co_phone']
    emp_count = request.get_json()['emp_count']
    company_description = request.get_json()['company_description']
    commited_toNot = request.get_json()['commited_to']
    translation = {39: None}
    commited_to = str(commited_toNot).translate(translation)
    estimated_cost = request.get_json()['estimated_cost']
    revenue_stream = request.get_json()['revenue_stream']
    collabration = request.get_json()['collabration']
    created = datetime.utcnow()
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO data2 (first_name, last_name, email, phone, company_name, website_url, country, city, fund_raised, company_type, company_estb, isWorking, co_first_name, co_last_name, co_email, co_phone, emp_count, company_description, commited_to, estimated_cost, revenue_stream, collabration, created )  VALUES (%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (first_name, last_name, email, phone, company_name, website_url, country, city, fund_raised, company_type, company_est, isWorking, co_first_name, co_last_name, co_email, co_phone, emp_count, company_description, commited_to, estimated_cost, revenue_stream, collabration, created))
    mysql.connection.commit()
    cur.close()
    
    result = {
		'first_name' : first_name,
		'last_name' : last_name,
		'email' : email,
		'phone' : phone,
    }
    return jsonify({'result' : result})
    

@app.route('/api/collection', methods=['GET'])
@jwt_required
def getdata():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM data2 ORDER BY id DESC")
    rv = cur.fetchall()
    return jsonify(rv)

@app.route('/api/view/<id>', methods=['GET'])
@jwt_required
def viewdata(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM data2 where id = '" + id + "'" )
    rv = cur.fetchone()
    return jsonify(rv)


if __name__ == '__main__':
    app.run(debug=True)