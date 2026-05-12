import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        shop: "Shop",
        collections: "Collections",
        about: "About",
        search: "Search fragrances...",
        cart: "Bag"
      },
      hero: {
        subtitle: "Luxury Fragrance House",
        title: "Essence of Elegance",
        cta: "Discover Collection"
      },
      common: {
        admin: "Admin",
        logout: "Logout",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        shop: "Магазин",
        collections: "Коллекции",
        about: "О нас",
        search: "Поиск ароматов...",
        cart: "Корзина"
      },
      hero: {
        subtitle: "Дом Люксовой Парфюмерии",
        title: "Сущность Элегантности",
        cta: "Открыть Коллекцию"
      },
      common: {
        admin: "Админ",
        logout: "Выход",
        save: "Сохранить",
        cancel: "Отмена",
        delete: "Удалить",
        edit: "Изменить"
      }
    }
  },
  uz: {
    translation: {
      nav: {
        home: "Bosh sahifa",
        shop: "Do'kon",
        collections: "To'plamlar",
        about: "Biz haqimizda",
        search: "Atirlarni qidirish...",
        cart: "Savat"
      },
      hero: {
        subtitle: "Hashamatli Atirlar Uyi",
        title: "Nafislik Mohiyati",
        cta: "To'plamni Ko'rish"
      },
      common: {
        admin: "Admin",
        logout: "Chiqish",
        save: "Saqlash",
        cancel: "Bekor qilish",
        delete: "O'chirish",
        edit: "Tahrirlash"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
