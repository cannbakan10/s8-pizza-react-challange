import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/iteration-1-images/logo.svg";
import pizza from "../assets/images/iteration-2-images/pictures/form-banner.png";
import icon1 from "../assets/images/iteration-2-images/footer/icons/icon-1.png"; // konum
import icon2 from "../assets/images/iteration-2-images/footer/icons/icon-2.png"; // mail
import icon3 from "../assets/images/iteration-2-images/footer/icons/icon-3.png"; // telefon

import li0 from "../assets/images/iteration-2-images/footer/insta/li-0.png";
import li1 from "../assets/images/iteration-2-images/footer/insta/li-1.png";
import li2 from "../assets/images/iteration-2-images/footer/insta/li-2.png";
import li3 from "../assets/images/iteration-2-images/footer/insta/li-3.png";
import li4 from "../assets/images/iteration-2-images/footer/insta/li-4.png";
import li5 from "../assets/images/iteration-2-images/footer/insta/li-5.png";

const instaImgs = [li0, li1, li2, li3, li4, li5];

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

      <section className="flex-1 bg-[#CE2829]">
        <div className="max-w-[960px] mx-auto px-4 pt-10 pb-16">
          {/* Başlık */}
          <div className="text-center">
            <p className="hero-eyebrow">lezzetin yolda</p>
            <h1 className="mt-2 text-white font-light tracking-wide text-[40px] md:text-[56px] leading-tight">
              SİPARİŞ ALINDI!
            </h1>
            <div className="mx-auto mt-3 h-[2px] w-48 bg-white/30" />
          </div>

          {order && (
            <div className="mt-10 md:mt-12">
              {/* Detaylar */}
              <div className="w-full max-w-[480px] mx-auto text-white/90 text-[14px] leading-6 text-center">
                <h2 className="sr-only">Sipariş Detayları</h2>

                <p className="mb-1 opacity-80">Position Absolute Acı Pizza</p>

                <p className="mt-4">
                  <span className="opacity-70 mr-2">Boyut:</span>
                  <span className="text-white">{order.boyut || "-"}</span>
                </p>
                <p>
                  <span className="opacity-70 mr-2">Hamur:</span>
                  <span className="text-white">{order.hamur || "-"}</span>
                </p>

                <div className="mt-3">
                  <span className="opacity-70 mr-2">Ek Malzemeler:</span>
                  {order.malzemeler?.length ? (
                    <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-white">
                      {order.malzemeler.map((m, idx) => (
                        <span key={m}>
                          {m}
                          {idx < order.malzemeler.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-white">—</span>
                  )}
                </div>

              </div>

              <div className="w-full max-w-[340px] mx-auto mt-8">
                <div
                  className="
          rounded-md border border-white/25
          bg-white/5 backdrop-blur-[1px]
          px-6 py-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)]
        "
                >
                  <h3 className="font-medium mb-4 text-center">
                    Sipariş Toplamı
                  </h3>

                  <div className="space-y-3 text-[14px]">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Seçimler</span>
                      <span className="text-white">
                        {(order.secimlerUcreti ?? 0).toFixed(2)}₺
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/80 font-semibold">
                        Toplam
                      </span>
                      <span className="text-white/80] font-semibold">
                        {(order.toplam ?? 0).toFixed(2)}₺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/*FOOTER*/}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <img src={logo} alt="Teknolojik Yemekler" className="hero-logo" />
            <ul className="footer-contact">
              <li>
                <img src={icon1} alt="" />
                <span>
                  341 Londonderry Road,
                  <br />
                  İstanbul Türkiye
                </span>
              </li>
              <li>
                <img src={icon2} alt="" />
                <span>aciktim@teknolojikyemekler.com</span>
              </li>
              <li>
                <img src={icon3} alt="" />
                <span>+90 216 123 45 67</span>
              </li>
            </ul>
          </div>
          {/* Hot Menu */}
          <div className="footer-col">
            <h3 className="footer-heading">Hot Menu</h3>
            <ul className="footer-links">
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
          {/* ınstagram */}
          <div className="footer-col">
            <h3 className="footer-heading">Instagram</h3>
            <div className="footer-insta">
              {instaImgs.map(
                (
                  src,
                  i /*Bu dizi yukarda tanımlı içinde 6 foto var*/ /*src: her döngüdeki resim yolu*/
                ) => (
                  <img key={i} src={src} alt={`insta-${i}`} />
                )
              )}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Teknolojik Yemekler.</p>
        </div>
      </footer>
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
