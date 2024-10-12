import AppIllustration from '@/components/appIllustation'
import Banner from '@/components/banner'
import CanvasEffect from '@/components/canvasEffect'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import KeyFeatures from '@/components/keyfeatures'
import Navbar from '@/components/navbar'

export default function Home() {
    return (
        <div className="p-3">
            <Navbar />
            <CanvasEffect />
            <main>
                <Hero />
                <AppIllustration />
                <KeyFeatures />
                <Banner />
            </main>
            <Footer />
        </div>
    )
}
