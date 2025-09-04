import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import pizza from "../assets/images/iteration-2-images/pictures/form-banner.png";
import icon1 from "../assets/images/iteration-2-images/footer/icons/icon-1.png"; // konum
import icon2 from "../assets/images/iteration-2-images/footer/icons/icon-2.png"; // mail
import icon3 from "../assets/images/iteration-2-images/footer/icons/icon-3.png"; // telefon
import logo from "../assets/images/iteration-1-images/logo.svg";
import li0 from "../assets/images/iteration-2-images/footer/insta/li-0.png";
import li1 from "../assets/images/iteration-2-images/footer/insta/li-1.png";
import li2 from "../assets/images/iteration-2-images/footer/insta/li-2.png";
import li3 from "../assets/images/iteration-2-images/footer/insta/li-3.png";
import li4 from "../assets/images/iteration-2-images/footer/insta/li-4.png";
import li5 from "../assets/images/iteration-2-images/footer/insta/li-5.png";
const instaImgs = [li0, li1, li2, li3, li4, li5];

import axios from "axios";

export default function OrderPizza({ onSiparisGonder }) {
  const [adet, setAdet] = useState(1); // başlangıç 1 pizza
  const fiyat = 85.5; // sabit taban fiyat

  const navigate = useNavigate();

  const {
    /* react hook form */ register /* register inputları rhf a bağlar */,
    handleSubmit /*formu gönderdiğimizde çalışacak */,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      isim: "",
      boyut: "",
      hamur: "",
      malzemeler: [],
      not: "",
    } /* başlangıç değerleri */,
    mode: "onChange",
  });

  const secilenMalzemeler = watch("malzemeler") || [];
  const ekstraBirimUcret = 5;
  const secimlerUcreti = secilenMalzemeler.length * ekstraBirimUcret;
  const toplam = adet * fiyat + secimlerUcreti;

  /* handleSubmit(gonder) tetiklendiğinde bu fonksiyon çalışır. */
  const gonder = async (degerler) => {
    if (!isValid) return; /* Eğer form valid değilse fonksiyon  durur. */
    const payload = { ...degerler, adet, fiyat, secimlerUcreti, toplam };
    try {
      console.log("📦 Sipariş Özeti:", payload);

      const res = await axios.post("https://reqres.in/api/pizza", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Mock API yanıtı:", res.status, res.data);
      navigate("/success", { state: { payload, response: res.data } });
    } catch (err) {
      console.error("❌ POST hatası:", err?.response?.status, err?.message);

      // ✅ Başarılı gönderim sonrası yönlendirme
      navigate("/success", { state: { payload } });
    }
  };

  return (
    <section className="min-h-screen bg-white">
      {/* ÜST KIRMIZI BAR */}
      <div className="bg-[#CE2829] relative z-20">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center">
          <h1 className="text-white font-bold tracking-wide text-3xl md:text-4xl">
            Teknolojik Yemekler
          </h1>
        </div>
      </div>

      {/*GİRİŞ (BEJ ) */}
      <div className="relative bg-[#FAF7F2]">
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-0 pb-16">
          {/* Pizza görseli */}
          <div className="flex justify-center -mt-12 mb-6">
            <img
              src={pizza}
              alt="Position Absolute Acı Pizza"
              className="w-full max-w-md mx-auto"
            />
          </div>
          {/* Başlık */}
          <header className="mb-8">
            <p className="text-gray-500 text-xs md:text-sm mb-2">
              <Link to="/" className="text-black">
                Anasayfa
              </Link>{" "}
              <span className="opacity-70">-</span>{" "}
              <span className="font-bold text-[#CE2829]">Sipariş Oluştur</span>
            </p>
            <br />

            <h2 className="text-[#292929] text-xl md:text-2xl font-semibold tracking-tight">
              Position Absolute Acı Pizza
            </h2>
            <br />

            {/* fiyat / puan / yorum sayısı */}
            <div className="mt-3 flex items-baseline">
              <span className="text-2xl md:text-3xl font-extrabold text-[#292929]">
                85.50₺
              </span>
              <div className="ml-auto flex items-center gap-6 text-sm">
                <span className="text-gray-600">4.9</span>
                <span className="text-gray-400">(200)</span>
              </div>
            </div>
            <br />
            <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-3xl">
              Frontend Dev olarak hâlâ position:absolute kullanıyorsan bu çok
              acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan
              İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen
              pizzetta denir.
            </p>
          </header>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-[#FAF7F2] to-white z-0" />
      </div>

      {/*FORM */}
      <div className="mx-auto max-w-3xl px-4 pt-6 pb-8">
        <form onSubmit={handleSubmit(gonder)} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Boyut Seç */}
            <fieldset className="min-w-0">
              <legend className="mb-2 block text-[15px] font-semibold text-[#292929]">
                Boyut Seç <span className="text-red-600">*</span>
              </legend>

              {/* <div className="space-y-3"> 1. iterasyon
                {["Küçük", "Orta", "Büyük"].map((boyut) => (
                  <label
                    key={boyut}
                    className="flex items-center gap-2 text-sm text-[#292929]"
                  >
                    <input
                      type="radio"
                      value={boyut}
                      {...register("boyut", {
                        required: "Boyut seçimi zorunludur.",
                      })}
                      className="h-3.5 w-3.5 align-middle"
                    />
                    <span>{boyut}</span>
                  </label>
                ))}
              </div> */}

             <div className="flex items-center gap-3">
  {["S", "M", "L"].map((val) => (
    <label key={val} className="cursor-pointer">
      {/* input görünmez, peer ile kardeşini kontrol ediyor */}
      <input
        type="radio"
        value={val}
        {...register("boyut", {
          required: "Boyut seçimi zorunludur.",
        })}
        className="sr-only peer"
      />
      <div
        title={val}
        className="
          h-10 w-10 rounded-full flex items-center justify-center
          font-semibold transition
          bg-white text-gray-700 shadow-sm border border-gray-200

          peer-checked:bg-[#FAF7F2]
          peer-checked:text-[#292929]
          peer-checked:border-[#E5E5E5]

          hover:ring-2 hover:ring-[#CE2829]/10
        "
      >
        {val}
      </div>
    </label>
  ))}
</div>

{errors.boyut && (
  <p className="mt-2 text-xs text-red-600">{errors.boyut.message}</p>
)}
            </fieldset>

            {/* Hamur Seç */}
            <fieldset className="min-w-0">
              <legend className="mb-2 block text-[15px] font-semibold text-[#292929]">
                Hamur Seç <span className="text-red-600">*</span>
              </legend>

              <select
                defaultValue=""
                {...register("hamur", { required: "Hamur seçimi zorunludur." })}
                className="w-full text-sm border border-gray-400 rounded px-2 py-1"
              >
                <option value="" disabled hidden>
                 -Hamur Kalınlığı Seç-
                </option>
                <option>İnce</option>
                <option>Orta</option>
                <option>Kalın</option>
              </select>

              {errors.hamur && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.hamur.message}
                </p>
              )}
            </fieldset>

            {/* Ek Malzemeler */}
            <fieldset className="md:col-span-2 mt-6">
              <legend className="text-[15px] font-semibold text-[#292929]">
                Ek Malzemeler
              </legend>
              <p className="text-sm text-gray-600 mt-1 mb-3">
                En Fazla 10 malzeme seçebilirsiniz. 5₺
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                {[
                  "Pepperoni",
                  "Sosis",
                  "Kanada Jambonu",
                  "Tavuk Izgara",
                  "Soğan",
                  "Domates",
                  "Mısır",
                  "Sucuk",
                  "Jalapeno",
                  "Sarımsak",
                  "Biber",
                  "Ananas",
                  "Kabak",
                ].map((malzeme) => (
                  <label
                    key={malzeme}
                    /* {className="flex items-center gap-2 text-[15px] text-[#292929] min-w-0"}*/
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={malzeme}
                      {...register("malzemeler", {
                        validate: (_, all) => {
                          const secimler = all.malzemeler || [];
                          if (secimler.length < 4)
                            return "En az 4 malzeme seçmelisiniz.";
                          if (secimler.length > 10)
                            return "En fazla 10 malzeme seçebilirsiniz.";
                          return true;
                        },
                      })}
                      className="sr-only peer"
                    />

                    {/* Kutu: seçilince sarı, tik siyah */}
                    <span
                      className="
            inline-flex h-9 w-9 items-center justify-center rounded-md
            border border-gray-300 bg-white shadow-sm transition
            text-transparent peer-checked:text-[#292929]
            peer-checked:bg-[#FDC913] peer-checked:border-[#FDC913]
            peer-focus-visible:ring-2 peer-focus-visible:ring-[#FDC913]
            peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white
          "
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-5 w-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 111.414-1.414l3.182 3.182 6.364-6.364a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <span className="text-[15px] text-[#292929]">
                      {malzeme}
                    </span>
                  </label>
                ))}
              </div>

              {errors.malzemeler && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.malzemeler.message}
                </p>
              )}
            </fieldset>
          </div>

          {/* Not */}
          <fieldset className="mt-6 block">
            <legend className="mb-2 block text-[15px] font-semibold text-[#292929]">
              Sipariş Notu
            </legend>
            <textarea
              {...register("not")}
              rows={3}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                       outline-none focus:ring-2 focus:ring-[#CE2829] placeholder:text-gray-400 resize-y"
            />
            <div className="mt-5 h-px bg-gray-200" />
          </fieldset>

          <div className="my-2 h-px w-full bg-gray-200" />

          {/* Sayaç + Özet */}
          <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-end gap-4">
            <div className="flex md:mr-4">
              <div className="inline-flex items-stretch rounded-md overflow-hidden shadow-sm border border-[#FDC913]">
                <button
                  type="button"
                  onClick={() => setAdet((a) => Math.max(1, a - 1))}
                  className="h-9 w-10 grid place-items-center bg-[#FDC913] text-[#292929] font-semibold hover:brightness-110"
                >
                  −
                </button>

                <div className="h-9 w-10 grid place-items-center bg-white text-[#292929] font-semibold select-none">
                  {adet}
                </div>

                <button
                  type="button"
                  onClick={() => setAdet((a) => a + 1)}
                  className="h-9 w-10 grid place-items-center bg-[#FDC913] text-[#292929] font-semibold hover:brightness-110"
                >
                  +
                </button>
              </div>
            </div>

            {/* Özet + Submit */}
            <div className="w-full md:w-[320px]">
              <div className="rounded-md border border-gray-200 bg-[#FAF7F2] p-5">
                <h3 className="text-[15px] font-semibold text-[#292929]">
                  Sipariş Toplamı
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Seçimler</span>
                    <span className="text-gray-600">
                      {secimlerUcreti.toFixed(2)}₺
                    </span>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#CE2829]">Toplam</span>
                    <span className="font-semibold text-[#CE2829]">
                      {toplam.toFixed(2)}₺
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="mt-3 w-full rounded-md bg-[#FDC913] py-3 font-semibold text-[#292929] shadow hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                SİPARİŞ VER
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* ===== /FORM BLOĞU ===== */}


      
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
                  {instaImgs.map((src, i) => ( /*Bu dizi yukarda tanımlı içinde 6 foto var*/ /*src: her döngüdeki resim yolu*/
                    <img key={i} src={src} alt={`insta-${i}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2023 Teknolojik Yemekler.</p>
            </div>
          </footer>
    </section>

  );
}

/* 
mx-auto: Yatayda ortalamak için kullanılır
max-w-3xl: İçerik genişliğini maksimum 3xl (48rem ≈ 768px) ile sınırlar.
px-4: Sağdan ve soldan 1rem (16px) iç boşluk ekler.
py-6: Üstten ve alttan 1.5rem (24px) iç boşluk ekler.
tracking-wide: Harfler arasına biraz daha fazla boşluk ekler.

text-white/80: Beyaz rengin %80 şeffaf hali. Daha soft görünür.
text-xs: Yazı boyutunu ekstra küçük (12px) yapar.
mt-1: Üstten küçük bir boşluk ekler (0.25rem = 4px).

<span className="opacity-70">-</span>: Tire işareti, %70 opaklık ile daha soluk görünür.


mb-6: 1.5rem = 24px


md:text-2xl
Responsive (ekran boyutuna göre) sınıf.
md: → minimum 768px genişlikten itibaren geçerli olur.
Yani küçük ekranlarda text-xl, orta ve büyük ekranlarda text-2xl (≈ 24px).


tracking-tight: Harf aralığını biraz daraltır.

mt-3: Üstten 0.75rem (12px) margin (boşluk) ekler.

fiyat bölümü
flex: İçerikleri yatay eksende (yan yana) hizalar.
items-baseline: Flex içindeki elemanları metin taban çizgisine (baseline) göre hizalar.
Yani “₺” sembolü ile sayı aynı hizada düzgün görünür.

gap-6 → İçindeki elemanlar arasında 1.5rem (24px) boşluk bırakır.


leading-relaxed
Satır yüksekliğini biraz daha rahat / geniş yapar.
Yani satırlar arasında ekstra boşluk bırakır.


form:
<fieldset> → semantik olarak ilgili radio’ları gruplar.
<legend> → grup başlığı.



Not kutusu
w-full → Genişliği bulunduğu kutunun tamamını kaplar
rows={3} ile uyumlu, başlangıçta 3 satır yüksekliğinde
rounded-md → Hafif yuvarlatılmış köşeler
border border-gray-300 → İnce gri kenarlık
bg-white → Arka plan beyaz
px-3 → Sağ ve sol iç boşluk 12px
py-2 → Üst ve alt iç boşluk 8px
text-sm → Küçük yazı (≈ 14px)
placeholder:text-gray-400 → Placeholder metni gri tonunda
outline-none → Varsayılan tarayıcı outline’ı (mavi kenarlık) kaldırılır.
focus:ring-2 focus:ring-[#CE2829] → Tıklanınca kırmızı tonunda (hex #CE2829) 2px’lik glow/halo
resize-y → Kullanıcı textarea’yı sadece dikeyde (yukarı-aşağı) büyütüp küçültebilir. Yanlara doğru büyütemez
*/
