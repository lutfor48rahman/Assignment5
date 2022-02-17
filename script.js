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