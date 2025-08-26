import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/iteration-1-images/logo.svg";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.payload; // gönderilen sipariş verisi
  const id = location.state?.response?.id; // mock API'den dönen id

  return (
    <main className="min-h-screen bg-[#CE2829] text-white flex flex-col">
      <header className="py-6">
        <div className=" max-w-[960px] mx-auto px-4 text-center">
          <Link to={"/"} className="inline-block" aria-label="Ana sayfaya dön">
            <img
              src={logo}
              alt="Teknolojik Yemekler"
              className="h-7 md:h-8 select-none pointer-events-none"
            />
          </Link>
        </div>
      </header>

      <section className="flex-1 flex items-center">
        <div className="max-w-[960px] mx-auto px-4 text-center">
          {/*Mobil*/}
          <h1 className="md:hidden text-[28px] sm:text-[32px] font-light tracking-wide leading-tight text-white">
            <span className="block">TEBRİKLER!</span>
            <span className="block">SİPARİŞİNİZ</span>
            <span className="block">ALINDI!</span>
          </h1>
          <h1 className="hidden md:block text-[44px] lg:text-[56px] font-light tracking-wide leading-tight text-white">
            <span className="block">TEBRİKLER!</span>
            <span className="block">SİPARİŞİNİZ ALINDI!</span>
          </h1>
        </div>
      </section>
    </main>
  );
}

/* 
min-h-screen: Bu elementin minimum yüksekliği, ekranın tamamı (100vh) olsun
py-6: Üstten ve alttan 24px padding ekler
max-w-[960px]: kutu en fazla 960px genişler, daha büyük ekranlarda taşmaz.
px-4: sağdan & soldan 16px padding.
                1 = 0.25rem = 4px
                2 = 0.5rem = 8px
                3 = 0.75rem = 12px
                4 = 1rem = 16px
                6 = 1.5rem = 24px
                8 = 2rem = 32px

text-center: Yazıyı yatayda ortalar.
mx-auto: margin-left: auto; margin-right: auto : Bu da kutuyu yatayda ortalar

h-7: height: 28px;
md:h-8: Küçük ekranlarda (mobil) → height: 28px, Orta ve üstü ekranlarda (tablet/pc) → height: 32px
    md: → responsive breakpoint (medium ekran = min-width: 768px)
    h-8 = height: 2rem = 32px

select-none:Kullanıcı bu elementin içindeki metni seçemez
pointer-events-none: Bu element mouse/klik olaylarını görmezden gelir.


text-[28px] md:text-[44px]

text-[28px] → Yazı boyutu 28px olur.

Buradaki köşeli parantez [28px] → Tailwind’in hazır scale’i dışında custom değer kullanmanı sağlar.

md:text-[44px] → Ekran genişliği 768px ve üstünde (medium breakpoint) yazı boyutu 44px olur.

            Mobilde: 28px
            Tablet/PC’de: 44px

font-light: Yazı daha ince (light) bir font ağırlığında görünür.

tracking-wide:Yani yazının harfleri arası normalden daha açık olur.
            letter-spacing ayarıdır (harfler arası boşluk).
            wide = biraz daha geniş aralık.

leading-tight: satırlar birbirine daha yakın görünür.
            line-height (satır yüksekliği).
            tight = dar satır aralığı.


*/
