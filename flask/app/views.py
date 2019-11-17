# views.py

from flask import render_template, request, jsonify, redirect, url_for
import json
import pymongo
from pymongo import MongoClient
import datetime

from app import app
from maildata import mail_data

mongodb_uri = "mongodb://admin:pr0lly@ds018839.mlab.com:18839/junction"


@app.route('/create_user')
def create_user():
    add_user()
    return redirect(url_for('inbox'))


@app.route('/')
def entry():
    return render_template("entry.html")


@app.route('/inbox')
def inbox():
    user = get_user_info(1)
    return render_template("index.html", mails=user['mails'], servers=user['servers'], skills=user['skills'], fazer=user['fazer'])


@app.route('/update_mail', methods=['POST'])
def update_mail():
    user_id = 1
    mail = request.form.to_dict()
    user = get_user_info(user_id)
    for i in range(len(user['mails'])):
        if int(user['mails'][i]['id']) == int(mail['id']):
            for key in mail:
                if key == 'starred':
                    if mail[key].strip() == 'star':
                        user['mails'][i]['starred'] = False
                    else:
                        user['mails'][i]['starred'] = True
                elif key in ['fazer', 'skills']:
                    user[key] = mail[key]
                else:
                    user['mails'][i][key] = mail[key]
            break
    db = connect().mails
    db.update_one({'user_id': user_id}, {'$set': {
                  'mails': user['mails'], 'fazer': user['fazer'], 'skills': user['skills']}})
    new_mail = get_mail(user_id)
    print(new_mail)

    if new_mail:
        return jsonify(new_mail)
    return 'false'


def get_mail(user_id):
    # user_id = 1
    user = get_user_info(user_id)
    for mail in user['mails']:
        print(mail)
        if mail['attack'] != 'done':
            break
    else:
        user['mails'].insert(0, mail_data[len(user['mails'])-1])
        db = connect().mails
        db.update({'user_id': user_id}, {'$set': {'mails': user['mails']}})

        return user['mails'][0]
    return False


def connect():
    client = MongoClient(mongodb_uri, retryWrites=False)
    db = client.junction
    return db


def add_mail(user_id, mail):
    db = connect().mails
    mails = db.find_one({'user_id': user_id})
    if mails:
        mails['mails'].append(mail)
        db.update_one({'user_id': user_id}, {
                      '$set': {'mails': mails['mails']}})
        return True
    else:
        return False


def add_user():
    db = connect().mails
    number = 0
    for _ in db.find():
        number += 1
    db.insert({
        'user_id': number,
        'mails': [{
            "sender": "Game Server",
            "email":"game@teamprobably.com",
            "read_status": "unread",
            "content": """Howdy Hacker!
                Welcome to KeyLock, a virtual world to help you understand about the various threats that can harm you on the internet,
                defend yourself in the real world against such cyber attacks. You'll get to know more about these attacks as you go further
                through the game.
                <br><br>

                You are a Cybersecurity Professional with contracts from various popular companies to manage and protect their servers from various potential threats.<br>
                Let's begin by exploring the virtual world. As you might have realized, this is a mail server wherein you'll receive the mails of the various companies.
                <br><br>

                To proceed further, click on the Take Action button below or click on the Ignore button to quit.<br>
                You can also click on the Investigate button to know more about the information received and the ways to tackle the threats.
                <br><br>
                P.S.: Keep an eye on the inbox and beware of fake mails.""",
            "time": "10.30",
            "starred": True,
            "id": 0,
            "subject": "Click me!!!",
            "attack": True
        }],
        "servers": [
            {
                "company_name": "Ericsson",
                "name": "Sony",
                "services": [{"name": "Anti-Spam", "level": "Level 1"}],
                "health": 75,
                "active_conns": 100,
            }
        ],
        "skills": 50,
        "fazer": 30
    })
    print("User added")
    return True


def get_user_info(user_id):
    db = connect().mails
    return db.find_one({'user_id': user_id})
