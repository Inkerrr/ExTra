const IncomeSchema = require("../models/IncomeModel");


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })
    
    
    try {
        
        //validations
        if(!title || !category || !description || !date){ //checks whether the data is typed
            return res.status(400).json({message: 'All fields are required'}) //returns error
        }
        if(amount <= 0 || !amount === 'number'){ //checks whether the amount is typed
            return res.status(400).json({message: 'Amount must be positive'}) //returns error
        }
        await income.save()
        res.json({message:'Income Added'})
        
        } catch (error) {
        
    }

    console.log(income)
}