from flask import Flask, render_template

app = Flask(__name__)


@app.route("/main")
def index():
    return render_template(
        "index.html"
    )


@app.route("/")
def login():
    return render_template("login.html")


app.run(debug=True)
