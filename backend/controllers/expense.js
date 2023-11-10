const ExpenseSchema = require("../models/ExpenseModel");


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    
    const income = ExpenseSchema({
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
        //await db.Income.save({income})
        await income.save()
        res.status(200).json({message:'Expense Added'})
        
        } catch (error) {
            res.status(500).json({message:'Server error', error: error})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const{id} = req.params; 
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        }) 
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        }) 
}   