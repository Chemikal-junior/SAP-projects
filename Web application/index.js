const e = require("express");
const Database = require("better-sqlite3");

const db = new Database("data/Databaze.db");
db.exec(`CREATE TABLE IF NOT EXISTS travels (
    travelId INTEGER PRIMARY KEY,
    agencyId INTEGER NOT NULL,
    customerId INTEGER NOT NULL,
    startingDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    bookingFee INTEGER,
    totalPrice INTEGER,
    currency TEXT,
    overallStatus TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS agency (
    agencyId INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS customers (
    customerId INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);
`);

const travels = db.prepare("SELECT * FROM travels");

// console.log(travels.all());

const app = e();

// const data = [
//     {travelId: 1, agencyId: 13, customerId: 55, startingDate: "2025-01-01", endDate: "2025-03-02", overallStatus: "a"},
//     {travelId: 2, agencyId: 16, customerId: 12, startingDate: "2026-01-08", endDate: "2026-02-01",  overallStatus: "r"},
//     {travelId: 3, agencyId: 54, customerId: 73, startingDate: "2026-08-04", endDate: "2026-09-07", overallStatus: "o"},
//     {travelId: 4, agencyId: 16, customerId: 55, startingDate: "2026-08-04", endDate: "2026-09-01", overallStatus: "r"}
// ];

// data.forEach(dic => {
//     db.prepare(`
//                     INSERT OR REPLACE INTO travels (travelId, agencyId, customerId, startingDate, endDate, overallStatus)
//                     VALUES (?, ?, ?, ?, ?, ?)
//                `).run(dic.travelId, dic.agencyId, dic.customerId, dic.startingDate, dic.endDate, dic.overallStatus);
// });

function isValidDate(dateString) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day); 
        return date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day;
    }
}

app.use(e.urlencoded({extended: true}));
app.use(e.json());

app.use(e.static("public"));

app.get("/", (req, res) => {res.render("index.ejs", {name: "Travels", data: travels.all()})});

app.post("/", (req, res) => {
    var body = req.body;
    var sqlreq = "SELECT * FROM travels WHERE 1=1";
    var sqlparam = {};
    
    if (/^\d+$/.test(body.travelId)) {
        sqlreq += " AND travelId = @travelId";
        sqlparam.travelId = Number(body.travelId);
    }

    if (/^\d+$/.test(body.agencyId)) {
        sqlreq += " AND agencyId = @agencyId";
        sqlparam.agencyId = Number(body.agencyId);
    }

    if (/^\d+$/.test(body.customerId)) {
        sqlreq += " AND customerId = @customerId";
        sqlparam.customerId = Number(body.customerId);
    }

    if (isValidDate(body.startingDate)) {
        sqlreq += " AND startingDate = @startingDate";
        sqlparam.startingDate = Number(body.startingDate);
    }

    if (isValidDate(body.endDate)) {
        sqlreq += " AND endDate = @endDate";
        sqlparam.endDate = Number(body.endDate);
    }

    res.send(JSON.stringify(db.prepare(sqlreq).all(sqlparam)));
});

app.listen(80, () => {console.log("Server is running on port 80.")});
