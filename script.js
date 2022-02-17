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