import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; //submit olunca /success e gönderecek
import axios from "axios";

const BASE_PRICE = 85.5; //sabit fiyat
const TOPPING_PRICE = 5; //ek malzeme fiyatı
const MIN_TOPPINGS = 4; //en az 4 malzeme
const MAX_TOPPINGS = 10; //en fazla 10

const SIZES = [
  { id: "s", label: "Küçük" },
  { id: "m", label: "Orta" },
  { id: "l", label: "Büyük" },
];
const DOUGHS = ["İnce", "Orta", "Kalın"];
const TOPPINGS = [
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
];

export default function OrderPizza() {
  const navigate = useNavigate();

  const [size, setSize] = useState(""); //boyutlar
  const [dough, setDough] = useState(""); //kalınlık
  const [toppings, setToppings] = useState([]); //malzemeler
  const [note, setNote] = useState(""); //not kısmı
  const [counter, setCounter] = useState(1); //adet sayacı
  const [submitting, setSubmitting] = useState(false); //submiti kontrol edecek

  const errors = useMemo(() => {
    //useMemo bir değeri hesaplayıp hafızada tutuyor
    const e = {};
    if (toppings.length > MAX_TOPPINGS)
      e.toppings = `En fazla ${MAX_TOPPINGS} malzeme seçebilirsin.`;
    if (counter < 1) e.counter = "Adet en az 1 olmalı.";
    return e;
  }, [size, dough, toppings, counter]); //bunlar değişirse fonksiyon çalışır ve error döner

  const isValid = Object.keys(errors).length === 0;
  const toppingsCost = toppings.length * TOPPING_PRICE; //Malzeme sayısı * 5 TL
  const linePrice = BASE_PRICE + toppingsCost; // tek pizza toplam fiyat
  const total = (linePrice * counter).toFixed(2); //toplam

  function toggleTopping(t) {
    //checkboxa tıklanınca aç kapa yapacak
    setToppings((prev) => {
      const isSelected = prev.includes(t);

      if (isSelected) {
        // varsa: çıkar
        return prev.filter((x) => x !== t);
      } else {
        // yoksa: ekle
        return [...prev, t];
      }
    });
  }

  const changeCounter = (a) =>
    setCounter((q) => Math.max(1, a === "inc" ? q + 1 : q - 1)); //Math.max sayıyı asla 1 in altına düşürmüıyor burda

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);

    try {
      const payload = {
        boyut: size,
        hamur: dough,
        malzemeler: toppings,
        özel: note.trim(),
        adet: counter,
        araToplam: linePrice.toFixed(2),
        toplam: total,
      };

      console.log("📦 Sipariş Özeti:", payload);

      const res = await axios.post("https://reqres.in/api/users", payload, {
        //mock apiye post isteği attı
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Mock API yanıtı:", res.status, res.data);

      // Başarı sayfasına yönlendir (yanıtı da taşıyabilirsin)
      navigate("/success", { state: { payload, response: res.data } });
    } catch (err) {
      console.error("❌ POST hatası:", err?.response?.status, err?.message);
      navigate("/success", {
        state: {
          payload: {
            boyut: size,
            hamur: dough,
            malzemeler: toppings,
            adet: counter,
            toplam: total,
          },
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#292929]">
      {/* NAVBAR */}
      <div className="bg-[#CE2829] text-white sticky top-0 z-50 shadow-sm text-center">
        <div className="mx-auto max-w-[900px] px-4 md:px-6 py-5">
          <h1 className="text-xl font-semibold">
            <Link to="/" className="no-underline text-white ">
              Teknolojik Yemekler
            </Link>
          </h1>
          <nav className="mt-2 text-sm text-center">
            <ol className="flex items-center justify-center gap-2 list-none">
              <li>
                <Link
                  to="/"
                  className="text-white/90 hover:text-white no-underline"
                >
                  Anasayfa
                </Link>
              </li>
              <li className="opacity-70">•</li>
              <li className="font-semibold">Sipariş Oluştur</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* İÇERİK */}
      <div className="mx-auto max-w-[900px] px-4 md:px-6 mt-8 pb-10">
        <div className="flex items-start justify-between">
          <div className="pr-6">
            <h2 className="text-[20px] md:text-[22px] font-semibold">
              Position Absolute Acı Pizza
            </h2>
            <br />
            <div className="text-[22px] font-extrabold">
              {BASE_PRICE.toFixed(2)}₺
            </div>
            <div className="text-right min-w-[120px]">
              <div className="text-xs text-gray-500">
                4.9 <span className="align-middle">(200)</span>
              </div>
            </div>
            <p className="mt-2 max-w-[680px] text-[13.5px] leading-6 text-gray-600">
              Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
              acı pizzanın tam sana göre. Pizza; domates, peynir ve genellikle
              çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
              odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
              yuvarlak; dilimlenmiş mayalı buğday bazlı hamurdan oluşan İtalyan
              kökenli lezzetli bir yemektir.
            </p>
          </div>
        </div>

        <br />
        <br />

        {/* FORM */}
        <form onSubmit={submitOrder} className="space-y-8">
          {/* Boyut & Hamur */}
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* BOYUT */}
            <div>
              <label className="mb-2 block text-sm font-semibold  ">
                Boyut Seç <span className="text-red-600">*</span>
              </label>
              <div className="space-y-2">
                {SIZES.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="size"
                      value={s.id}
                      checked={size === s.id}
                      onChange={() => setSize(s.id)}
                      required
                      style={{ accentColor: "#CE2829" }}
                      className="h-4 w-4"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
              {errors.size && (
                <p className="mt-2 text-sm text-red-600">{errors.size}</p>
              )}
            </div>

            {/* HAMUR */}
            <div> 
              <label className="mb-2 block text-sm font-semibold">
                Hamur Seç <span className="text-red-600">*</span>
              </label>

              <div className="w-full">
                <select
                  value={dough}
                  required
                  onChange={(e) => setDough(e.target.value)}
                  className="w-full max-w-[220px] sm:max-w-[260px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                >
                  <option value="" disabled>
                    Hamur Kalınlığı
                  </option>
                  {DOUGHS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {errors.dough && (
                <p className="mt-2 text-sm text-red-600">{errors.dough}</p>
              )}
            </div>
          </div>

          {/* EK MALZEMELER */}
          <section>
            <div className="mb-2 text-sm font-medium">
              Ek Malzemeler <br />
              <br />
              <span className="text-gray-500">
                En fazla {MAX_TOPPINGS} malzeme seçebilirsiiz. 5₺
                <br />
                <br />
                <br />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              {TOPPINGS.map((t) => {
                const checked = toppings.includes(t);
                const lockNew = !checked && toppings.length >= MAX_TOPPINGS;

                return (
                  <label
                    key={t}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={lockNew}
                      onChange={() => toggleTopping(t)}
                      className="h-4 w-4 accent-blue-500 disabled:opacity-40"
                    />
                    <span>{t}</span>
                  </label>
                );
              })}
            </div>
            {errors.toppings && (
              <p className="mt-2 text-sm text-red-600">{errors.toppings}</p>
            )}
          </section>

          {/* NOT */}
          <section>
            <label className="mb-2 block text-sm font-semibold">
              Sipariş Notu
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            />
          </section>

          <div className="my-2 h-px w-full bg-gray-200" />

          <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Sayaç */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => changeCounter("dec")} // - butonu
                className="h-9 w-9 rounded-md border border-yellow-400 bg-[#FDC913] text-[#292929] font-semibold hover:brightness-110"
              >
                −
              </button>
              <div className="min-w-12 rounded-md border bg-white px-4 py-2 text-center">
                {counter}
              </div>
              <button
                type="button"
                onClick={() => changeCounter("inc")} // + butonu
                className="h-9 w-9 rounded-md border border-yellow-400 bg-[#FDC913] text-[#292929] font-semibold hover:brightness-110"
              >
                +
              </button>
              {errors.counter && (
                <span className="ml-2 text-sm text-red-600">
                  {errors.counter}
                </span>
              )}
            </div>

            {/* Özet + Submit */}
            <div className="w-full md:w-[320px]">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-base font-semibold">
                  Sipariş Toplamı
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Seçimler</span>
                    <span>{toppingsCost.toFixed(2)}₺</span>
                  </div>

                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Toplam</span>
                    <span className="text-[#CE2829]">{total}₺</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValid || submitting}
                className="mt-4 w-full rounded-md bg-[#FDC913] px-6 py-3 font-semibold text-[#292929] shadow hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Gönderiliyor..." : "SİPARİŞ VER"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
