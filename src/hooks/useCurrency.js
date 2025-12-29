import { useState, useEffect, useRef } from 'react'

const DOLLAR_RATE_KEY = 'syria_currency_dollar_rate'

export function useCurrency() {
  // Get initial dollar rate from localStorage or default to 0
  const getInitialDollarRate = () => {
    const stored = localStorage.getItem(DOLLAR_RATE_KEY)
    return stored ? parseFloat(stored) || 0 : 0
  }

  const [dollarRate, setDollarRate] = useState(getInitialDollarRate)
  const [oldAmount, setOldAmount] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const lastChangedRef = useRef(null) // Track which field was last manually changed

  // Save dollar rate to localStorage whenever it changes
  useEffect(() => {
    if (dollarRate > 0) {
      localStorage.setItem(DOLLAR_RATE_KEY, dollarRate.toString())
    }
  }, [dollarRate])

  // Conversion functions
  const oldToNew = (old) => old / 100
  const newToOld = (newVal) => newVal * 100

  // Update new amount when old amount changes (only if old was manually changed)
  useEffect(() => {
    if (lastChangedRef.current === 'old') {
      if (oldAmount !== '' && !isNaN(parseFloat(oldAmount))) {
        const converted = oldToNew(parseFloat(oldAmount))
        setNewAmount(converted.toFixed(2))
        lastChangedRef.current = null // Reset after update
      } else if (oldAmount === '') {
        setNewAmount('')
        lastChangedRef.current = null
      }
    }
  }, [oldAmount])

  // Update old amount when new amount changes (only if new was manually changed)
  useEffect(() => {
    if (lastChangedRef.current === 'new') {
      if (newAmount !== '' && !isNaN(parseFloat(newAmount))) {
        const converted = newToOld(parseFloat(newAmount))
        setOldAmount(converted.toFixed(2))
        lastChangedRef.current = null // Reset after update
      } else if (newAmount === '') {
        setOldAmount('')
        lastChangedRef.current = null
      }
    }
  }, [newAmount])

  // Wrapper functions to track which field was changed
  const handleOldAmountChange = (value) => {
    lastChangedRef.current = 'old'
    setOldAmount(value)
  }

  const handleNewAmountChange = (value) => {
    lastChangedRef.current = 'new'
    setNewAmount(value)
  }

  // Calculate USD equivalent
  const getUSDEquivalent = (amount, isOldCurrency) => {
    if (!dollarRate || !amount || isNaN(parseFloat(amount))) return 0
    const amountNum = parseFloat(amount)
    if (isOldCurrency) {
      return amountNum / dollarRate
    } else {
      return amountNum / (dollarRate / 100)
    }
  }

  // Fraud Guard calculations
  const calculateChange = (itemPrice, cashGiven, priceIsOld, cashIsOld) => {
    if (!itemPrice || !cashGiven || isNaN(parseFloat(itemPrice)) || isNaN(parseFloat(cashGiven))) {
      return { amount: 0, currency: 'new' }
    }

    const price = parseFloat(itemPrice)
    const cash = parseFloat(cashGiven)

    // Convert both to new currency for calculation
    const priceInNew = priceIsOld ? oldToNew(price) : price
    const cashInNew = cashIsOld ? oldToNew(cash) : cash

    const changeInNew = cashInNew - priceInNew

    if (changeInNew < 0) {
      return { amount: 0, currency: 'new', insufficient: true }
    }

    // Return in the same currency as cash given
    if (cashIsOld) {
      return { amount: newToOld(changeInNew), currency: 'old' }
    } else {
      return { amount: changeInNew, currency: 'new' }
    }
  }

  return {
    dollarRate,
    setDollarRate,
    oldAmount,
    setOldAmount: handleOldAmountChange,
    newAmount,
    setNewAmount: handleNewAmountChange,
    oldToNew,
    newToOld,
    getUSDEquivalent,
    calculateChange
  }
}

