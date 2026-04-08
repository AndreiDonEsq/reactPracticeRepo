import express from 'express';


const app = express();
const PORT = 3000;


app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/api/settings', (req, res) => {
    res.json({
        theme: 'light',
        fontSize: 14,
    });
});

const user = {
    name: "John Doe",
    email: "asd"
}

app.get('/api/user', (req, res) => {
    res.json(user)
});

app.post('/api/user', (req, res) => {
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    console.log("Received user update: ", user);
    res.json(user);
});

//huge list of random letters
const hugeList = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}: ${Math.random().toString(36).substring(2, 15)}`);

app.get('/api/huge-list', (req, res) => {
    const search = req.query.search?.toString().toLowerCase();

    console.log("Received search term: ", search);
    if (!search) {
        return res.json(hugeList.slice(0, 100)); 
    }

    const filtered = hugeList.filter(item => 
        item.toLowerCase().includes(search)
    );

    res.json(filtered.slice(0, 100)); 
});