import { useState } from 'react'
import { DollarSign, ArrowLeftRight, Shield, BookOpen, Github, Mail, User, Phone } from 'lucide-react'
import { useCurrency } from './hooks/useCurrency'

function App() {
  const {
    dollarRate,
    setDollarRate,
    oldAmount,
    setOldAmount,
    newAmount,
    setNewAmount,
    getUSDEquivalent,
    calculateChange
  } = useCurrency()

  const [itemPrice, setItemPrice] = useState('')
  const [priceIsOld, setPriceIsOld] = useState(true)
  const [cashGiven, setCashGiven] = useState('')
  const [cashIsOld, setCashIsOld] = useState(true)

  const changeResult = calculateChange(itemPrice, cashGiven, priceIsOld, cashIsOld)

  // Cheatsheet data
  const cheatsheetData = [
    { old: '1,000', new: '10' },
    { old: '5,000', new: '50' },
    { old: '10,000', new: '100' },
    { old: '50,000', new: '500' },
    { old: '100,000', new: '1,000' },
    { old: '500,000', new: '5,000' },
    { old: '1,000,000', new: '10,000' },
    { old: '5,000,000', new: '50,000' }
  ]

  // Developer information - Update these with your details
  const developerName = ' م. أنس عباس'
  const developerEmail = 'anas.abass1@gmail.com'
  const developerPhone = '+963 988 102 369'
  const portfolioUrl = 'https://anasabbasdev.github.io/' // GitHub Pages URL

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          {/* Branding Section */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 flex-1">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-14 h-14  object-contain border-2 py-1 px-1 border-blue-300 shadow-sm"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/100x100/10b981/ffffff?text=AB'
                }}
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                🇸🇾 مساعد العملة السورية
              </h1>
            </div>
            {/* Developer Badge */}
            <div className="flex items-center gap-2 bg-gradient-to-l from-blue-50 to-emerald-50 px-4 py-2 rounded-lg border border-blue-200">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-700">
                المطور: <span className="text-blue-600">{developerName}</span>
              </span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              <DollarSign className="inline-block w-5 h-5 ml-2" />
              سعر الدولار (بالقديم)
            </label>
            <input
              type="tel"
              value={dollarRate || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '')
                setDollarRate(value === '' ? 0 : parseFloat(value) || 0)
              }}
              placeholder="أدخل السعر (مثال: 15000)"
              className="w-full px-4 py-4 text-2xl font-bold text-gray-800 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
            />
            {dollarRate > 0 && (
              <p className="mt-2 text-lg text-gray-600">
                سعر العملة الجديدة: <span className="font-bold text-emerald-600">
                  {(dollarRate / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6 mb-8 space-y-6 flex-1">
        {/* Quick Converter Card */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <ArrowLeftRight className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">محول سريع</h2>
          </div>

          <div className="space-y-4">
            {/* Old Currency Input */}
            <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-300">
              <label className="block text-lg font-semibold text-slate-700 mb-2">
                العملة القديمة (الحالية)
              </label>
              <input
                type="tel"
                value={oldAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  setOldAmount(value)
                }}
                placeholder="أدخل المبلغ"
                className="w-full px-4 py-4 text-3xl font-bold text-slate-800 border-2 border-slate-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-slate-400"
              />
              {oldAmount && dollarRate > 0 && (
                <p className="mt-2 text-lg text-slate-600">
                  ≈ ${getUSDEquivalent(oldAmount, true).toFixed(2)} دولار
                </p>
              )}
            </div>

            {/* New Currency Input */}
            <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-300">
              <label className="block text-lg font-semibold text-emerald-700 mb-2">
                العملة الجديدة (المحذوفة الأصفار)
              </label>
              <input
                type="tel"
                value={newAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  setNewAmount(value)
                }}
                placeholder="أدخل المبلغ"
                className="w-full px-4 py-4 text-3xl font-bold text-emerald-800 border-2 border-emerald-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-400"
              />
              {newAmount && dollarRate > 0 && (
                <p className="mt-2 text-lg text-emerald-600">
                  ≈ ${getUSDEquivalent(newAmount, false).toFixed(2)} دولار
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Fraud Guard - Change Calculator */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">احسب الباقي (تجنب الاحتيال)</h2>
          </div>

          <div className="space-y-4">
            {/* Item Price */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                سعر الغرض
              </label>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-base text-gray-600">العملة:</span>
                <button
                  onClick={() => setPriceIsOld(true)}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg min-h-[60px] transition-all ${
                    priceIsOld
                      ? 'bg-slate-600 text-white shadow-md'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  قديم
                </button>
                <button
                  onClick={() => setPriceIsOld(false)}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg min-h-[60px] transition-all ${
                    !priceIsOld
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-200 text-emerald-700'
                  }`}
                >
                  جديد
                </button>
              </div>
              <input
                type="tel"
                value={itemPrice}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  setItemPrice(value)
                }}
                placeholder="أدخل السعر"
                className={`w-full px-4 py-4 text-3xl font-bold border-2 rounded-lg focus:outline-none focus:ring-4 ${
                  priceIsOld
                    ? 'text-slate-800 border-slate-400 focus:ring-slate-400'
                    : 'text-emerald-800 border-emerald-400 focus:ring-emerald-400'
                }`}
              />
            </div>

            {/* Cash Given */}
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                المبلغ المدفوع
              </label>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-base text-gray-600">العملة:</span>
                <button
                  onClick={() => setCashIsOld(true)}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg min-h-[60px] transition-all ${
                    cashIsOld
                      ? 'bg-slate-600 text-white shadow-md'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  قديم
                </button>
                <button
                  onClick={() => setCashIsOld(false)}
                  className={`px-6 py-3 rounded-lg font-semibold text-lg min-h-[60px] transition-all ${
                    !cashIsOld
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-emerald-200 text-emerald-700'
                  }`}
                >
                  جديد
                </button>
              </div>
              <input
                type="tel"
                value={cashGiven}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '')
                  setCashGiven(value)
                }}
                placeholder="أدخل المبلغ المدفوع"
                className={`w-full px-4 py-4 text-3xl font-bold border-2 rounded-lg focus:outline-none focus:ring-4 ${
                  cashIsOld
                    ? 'text-slate-800 border-slate-400 focus:ring-slate-400'
                    : 'text-emerald-800 border-emerald-400 focus:ring-emerald-400'
                }`}
              />
            </div>

            {/* Change Result */}
            {itemPrice && cashGiven && (
              <div className={`rounded-lg p-6 border-4 ${
                changeResult.insufficient
                  ? 'bg-red-50 border-red-400'
                  : changeResult.currency === 'old'
                  ? 'bg-slate-100 border-slate-400'
                  : 'bg-emerald-100 border-emerald-400'
              }`}>
                <p className="text-xl font-semibold text-gray-700 mb-2">يجب أن يرجع لك البائع:</p>
                <p className={`text-5xl font-bold ${
                  changeResult.insufficient
                    ? 'text-red-600'
                    : changeResult.currency === 'old'
                    ? 'text-slate-800'
                    : 'text-emerald-800'
                }`}>
                  {changeResult.insufficient
                    ? 'المبلغ غير كافي!'
                    : changeResult.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  }
                </p>
                {!changeResult.insufficient && (
                  <p className="text-2xl font-semibold mt-2 text-gray-600">
                    بالعملة {changeResult.currency === 'old' ? 'القديمة' : 'الجديدة'}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Cheatsheet Grid */}
        <section className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">جدول التحويل السريع</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cheatsheetData.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200"
              >
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-700 mb-1">
                    {item.old}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mb-2">=</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {item.new}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t-2 border-slate-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Portfolio Section - Prominent but Professional */}
          <div className="mb-6 flex justify-center">
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-gradient-to-l from-blue-50 to-emerald-50 hover:from-blue-100 hover:to-emerald-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl px-6 py-3 transition-all duration-300 shadow-sm hover:shadow-md"
              title="زيارة موقعي الشخصي"
            >
              <div className="bg-blue-600 group-hover:bg-blue-700 p-2 rounded-lg transition-colors">
                <Github className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">استكشف أعمالي</p>
                <p className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  موقعي الشخصي
                </p>
              </div>
              <ArrowLeftRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>

          {/* Developer Info & Contact */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-300">
            {/* Developer Info */}
            <div className="text-center md:text-right">
              <p className="text-base font-semibold text-gray-700 mb-1">
                تم التطوير بواسطة: <span className="text-blue-600">{developerName}</span>
              </p>
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} جميع الحقوق محفوظة
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${developerEmail}`}
                  className="hover:text-blue-600 transition-colors"
                  title="تواصل معي"
                >
                  {developerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${developerPhone.replace(/\s/g, '')}`}
                  className="hover:text-blue-600 transition-colors"
                  title="اتصل بي"
                  dir="ltr"
                >
                  {developerPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

