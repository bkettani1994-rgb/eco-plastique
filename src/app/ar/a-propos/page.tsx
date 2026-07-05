import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ShieldCheck, Handshake, Lightbulb, Headset, Truck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { translations } from "@/lib/translations";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على إيكو بلاستيك، شركة مغربية متخصصة في أغطية طاولة PVC حسب المقاس، وواقيات المراتب المضادة للماء، والوسائد الطبية.",
};

const values = [
  {
    title: "الجودة",
    description: "نختار موادنا بعناية لضمان منتجات متينة وموثوقة.",
    icon: ShieldCheck,
  },
  {
    title: "الثقة",
    description: "الدفع عند الاستلام وخدمة عملاء سريعة الاستجابة يبنيان علاقة ثقة مع كل عميل.",
    icon: Handshake,
  },
  {
    title: "الابتكار",
    description: "نطوّر منتجاتنا باستمرار لتلبية الاحتياجات الحقيقية للأسر المغربية، من المقاس المخصص إلى المواد الجديدة.",
    icon: Lightbulb,
  },
  {
    title: "خدمة العملاء",
    description: "فريقنا متاح على واتساب لمرافقتك قبل وبعد طلبك.",
    icon: Headset,
  },
];

const whyIconMap: Record<string, LucideIcon> = {
  Truck,
  Wallet,
  ShieldCheck,
  Headset,
};

export default function AboutPageAr() {
  const why = translations.why;

  return (
    <div dir="rtl">
      <section className="bg-light-gray py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">
              من نحن — إيكو بلاستيك
            </h1>
            <p className="leading-relaxed text-gray-600">
              إيكو بلاستيك شركة مغربية متخصصة في تصنيع وتوزيع أغطية طاولة PVC حسب المقاس،
              وواقيات المراتب المضادة للماء، والوسائد الطبية. منذ بداياتنا، نحرص على تقديم منتجات
              مفيدة ومتينة وفي متناول جميع الأسر المغربية، بالجمع بين الجودة والراحة والعملية في
              الحياة اليومية.
            </p>
            <p className="leading-relaxed text-gray-600">
              مهمتنا بسيطة: حماية منزلك وتحسين راحتك بمنتجات مصمّمة لتدوم، مع خدمة عملاء مُصغية
              وتوصيل سريع في جميع أنحاء المغرب.
            </p>
          </div>
          <ImagePlaceholder aspect="video" iconSize={48} label="فريق إيكو بلاستيك" />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">قيمنا</h2>
            <p className="mt-2 text-gray-600">ما يوجّه عملنا كل يوم</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-light-gray p-6 text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-dark-gray">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">{why.heading}</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.items.map((item, i) => {
              const icons = [Truck, Wallet, ShieldCheck, Headset];
              const Icon = icons[i] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-dark-gray">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
