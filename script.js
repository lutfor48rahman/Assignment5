window.addEventListener('load', () => {
    'use strict'

    const select = {
        id(id) {
            return document.getElementById(id)
        },
        query(el) {
            return document.querySelector(el)
        },
    }

    class Calculator {
        constructor(options) {
            this.income = options.income
            this.expenses = {
                food: options.food,
                rent: options.rent,
                clothes: options.clothes,
            }
            this.totalExpense = 0
            this.percentage = options.percentage
            this.remains = 0


            this.savedAmount = 0
            this.currentBalance = 0
            this.error = false
        }
        calcCurrentBalance() {
            this.calcTotalExpense()
            const origin = this.income.value
            if (this.totalExpense > origin) {
                document.getElementById('incomeError').innerHTML = `Income balance must be greater expenses`;
            }
            this.currentBalance = origin - this.totalExpense

        }
        calcTotalExpense() {
            let sum = 0
            sum += +this.expenses.food.value
            sum += +this.expenses.rent.value
            sum += +this.expenses.clothes.value
            this.totalExpense = sum
        }

        calcRemains() {
            this.calcTotalExpense()
            this.calcSavedAmount()
            this.remains = this.income.value - this.totalExpense - this.savedAmount
        }
        calcSavedAmount() {
            this.calcCurrentBalance()
            if (this.percentage.value < 0) {
                this.error = true
                this.savedAmount = 0
                return
            } else if (!this.percentage.value) {
                this.savedAmount = 0
                return
            }

            const inc = this.currentBalance
            const percentage = this.percentage.value
            const saved = inc * 0.01 * percentage
            this.savedAmount = saved
            this.currentBalance -= this.savedAmount
            if (this.savedAmount > inc) {
                document.getElementById('savingError').innerHTML = ` balance must be greater then Saving amount. `;
            }
        }
    }

    const main = new Calculator({
        income: select.id('income'),
        food: select.id('food'),
        rent: select.id('rent'),
        clothes: select.id('clothes'),
        percentage: select.id('percentage'),
    })

    const calcExpenseBtn = select.id('calcExpense')
    const save = select.id('calcSave')
    const showExpense = select.id('totalExpenses')
    const balance = select.id('balance')
    const showSave = select.id('showSave')
    const remaining = select.id('remaining')
    calcExpenseBtn.addEventListener('click', () => {
        main.calcCurrentBalance()
        showExpense.textContent = ''
        showExpense.textContent = main.totalExpense
        balance.textContent = main.currentBalance
    })

    save.addEventListener('click', () => {
        main.calcCurrentBalance()
        main.calcSavedAmount()
        if (main.error) {
            select.id('overlay').classList.add('err')
            select.id('retry').addEventListener('click', () => {
                main.error = false
                select.id('overlay').classList.remove('err')
            })
            return
        }
        showSave.textContent = main.savedAmount
        remaining.textContent = main.currentBalance
    })
})