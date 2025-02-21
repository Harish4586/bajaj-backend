const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 1000;

app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input format. Expected an array." });
        }

        
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /[a-zA-Z]/.test(item));

        
        let highestAlphabet = [];
        if (alphabets.length > 0) {
            highestAlphabet = [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)];
        }

        
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com", 
            roll_number: "ABCD123", 
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});


app.get('/bfhl', (req, res) => {
    try {
        const response = {
            operation_code: 1
        };
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});


app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input format. Expected an array." });
        }

       
        for (const item of data) {
            if (typeof item !== 'string' && typeof item !== 'number') {
                return res.status(400).json({ is_success: false, error: "Invalid data type in array. Expected strings or numbers." });
            }
        }

    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});