import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Shield, Smartphone, Users, Zap, ChefHat, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Nutri
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
              Xususiyatlar
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              Qanday ishlaydi
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-green-600 transition-colors">
              Kirish
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Boshlash
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-100">
            <Brain className="w-4 h-4 mr-2" />
            AI asosidagi shaxsiylashtirilgan tavsiyalar
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sog'ligingizga mos ovqat buyurtma qiling
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Nutri — sun'iy intellekt yordamida sizning sog'lik holatingizga mos ovqat va shirinliklarni tavsiya qiluvchi
            platforma. Diabet, allergiya va boshqa kasalliklar bilan yashayotganlar uchun xavfsiz va mazali tanlov.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8 py-6"
              >
                Bepul boshlash
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 text-lg px-8 py-6 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Demo ko'rish
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,000+</div>
              <div className="text-gray-600">Faol foydalanuvchi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Sog'lom taom retsepti</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Mijoz mamnuniyati</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Nima uchun Nutri?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Zamonaviy texnologiya va tibbiy bilimlarni birlashtirgan holda, sizga eng mos ovqatni topishda yordam
              beramiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">AI Tavsiyalar</CardTitle>
                <CardDescription>
                  Sun'iy intellekt sizning sog'lik holatingizga mos ovqatlarni tavsiya qiladi.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Xavfsiz Tanlov</CardTitle>
                <CardDescription>
                  Diabet, allergiya va boshqa kasalliklar uchun xavfsiz ovqatlarni aniqlash.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Sog'lik Monitoring</CardTitle>
                <CardDescription>
                  Ovqatlanish tarixingiz va sog'lik ko'rsatkichlaringizni kuzatib boring.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Mobil Qulay</CardTitle>
                <CardDescription>Har qanday joyda va vaqtda qulay buyurtma berish imkoniyati.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-teal-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Mutaxassis Maslahati</CardTitle>
                <CardDescription>
                  Dietolog va shifokorlar bilan hamkorlikda ishlab chiqilgan tavsiyalar.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-indigo-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Tez Yetkazib Berish</CardTitle>
                <CardDescription>30-45 daqiqada buyurtmangizni eshigingizgacha yetkazib beramiz.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Qanday ishlaydi?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Faqat 3 ta oddiy qadam bilan sizga mos ovqatni toping va buyurtma bering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Profil Yarating</h3>
              <p className="text-gray-600">
                Sog'lik holatingiz, allergiya va ovqatlanish cheklovlaringiz haqida ma'lumot bering.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Tavsiya</h3>
              <p className="text-gray-600">
                Sun'iy intellekt sizga mos ovqatlarni tavsiya qiladi va xavfsizligini tekshiradi.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Buyurtma Bering</h3>
              <p className="text-gray-600">
                Tavsiya qilingan ovqatni tanlang va bir marta bosish bilan buyurtma bering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Bugun boshlaymizmi?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Nutri bilan sog'lom va xavfsiz ovqatlanish sayohatingizni boshlang. Birinchi buyurtmangiz uchun 20%
            chegirma!
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
              Hoziroq boshlash
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Nutri</span>
              </div>
              <p className="text-gray-400">Sog'ligingizga mos ovqat buyurtma qilish uchun AI asosidagi platforma.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platforma</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Xususiyatlar
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Narxlar
                  </Link>
                </li>
                <li>
                  <Link href="/restaurants" className="hover:text-white transition-colors">
                    Restoranlar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Yordam</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Qo'llab-quvvatlash
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Bog'lanish
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Kompaniya</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Biz haqimizda
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Maxfiylik
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Shartlar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nutri. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
