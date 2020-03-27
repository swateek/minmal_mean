if(!db.users.find({role:"admin"}).count()){
    db.users.insert({"_id": ObjectId(),"provider" : "local", "name" : "Admin", "email" : "admin@admin.com", "hashedPassword" : "p3a+m7/svZfSAh4UQfgDZ09cWToYyHF0qmWF48isYwteBxSVgJrfHt2a9vl+13mkiTYrlcWIDBoYo4pYKzETnw==", "salt" : "txQXOig8IFw1wGrruJpRuQ==", "role" : "admin"});
}