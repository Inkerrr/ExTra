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
        //await db.Income.save({income})
        await income.save()
        res.status(200).json({message:'Income Added'})
        
        } catch (error) {
            res.status(500).json({message:'Server error', error: error})
    }

    console.log(income)
}

exports.getIncomes = async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const{id} = req.params; 
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        }) 
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        }) 
}   