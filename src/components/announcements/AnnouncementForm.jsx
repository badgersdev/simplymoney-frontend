"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ui
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const DEFAULT_FORM_DATA_STATE = {
  label: "",
  description: "",
  email: "",
  phone: "",
  location: "",
  show_email: false,
  show_phone: false,
  category: "",
  exchange_type: "",
  seller_type: "",
  images: [],
};

export default function AnnouncementForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA_STATE);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TWORZYMY SPECJALNY OBIEKT KTÓRY zna pliki m.in zdjęcia.
    // JSON NIE ZNA pojęcia "pliki"

    // !!!!!!!!!!!!  FormData() nie mylić z formData z useState()  !!!!!!!!!
    const form = new FormData();

    for (const key in formData) {
      if (key !== "images") {
        form.append(key, formData[key]);
      }
    }

    formData.images.forEach((file) => {
      form.append("images", file);
    });

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        // NIE DODAWAĆ "Content-Type": "application/json"
        // PRZEGLĄDARKA SAMA USTAWI NAGŁÓWEK multipart/form-data z uwagi na to, że przesyłamy pliki
        body: form,
      });

      if (!res.ok) {
        throw new Error("Błąd podczas dodawania ogłoszenia.");
      }

      toast.success("Twoje ogłoszenie zostało dodane");

      setTimeout(() => {
        router.push("/announcements");
      }, 1500);

      setFormData(DEFAULT_FORM_DATA_STATE);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Tytuł ogłoszenia
        </label>
        <Input
          name="label"
          value={formData.label}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">Opis</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Adres Email (opcjonalnie)
        </label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Telefon (opcjonalnie)
        </label>
        <Input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Miasto / Lokalizacja
        </label>
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={formData.show_email}
            onCheckedChange={(val) => handleCheckboxChange("show_email", !!val)}
          />
          <span className="text-sm text-stone-700">Pokaż email publicznie</span>
        </label>

        <label className="flex items-center space-x-2">
          <Checkbox
            checked={formData.show_phone}
            onCheckedChange={(val) => handleCheckboxChange("show_phone", !!val)}
          />
          <span className="text-sm text-stone-700">
            Pokaż telefon publicznie
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">Kategoria</label>
        <Select
          value={formData.category}
          onValueChange={(val) => setFormData({ ...formData, category: val })}
        >
          <SelectTrigger>
            {formData.category ? formData.category : "Wybierz kategorię"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meat">Mięso</SelectItem>
            <SelectItem value="dairy">Nabiał</SelectItem>
            <SelectItem value="fruits">Owoce</SelectItem>
            <SelectItem value="vegetables">Warzywa</SelectItem>
            <SelectItem value="preserves">Przetwory</SelectItem>
            <SelectItem value="jars">Słoiki</SelectItem>
            <SelectItem value="other">Inne</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Typ wymiany
        </label>
        <Select
          value={formData.exchange_type}
          onValueChange={(val) =>
            setFormData({ ...formData, exchange_type: val })
          }
        >
          <SelectTrigger>
            {formData.exchange_type
              ? formData.exchange_type
              : "Wybierz typ wymiany"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">Sprzedaż</SelectItem>
            <SelectItem value="trade">Wymiana</SelectItem>
            <SelectItem value="both">Sprzedaż lub Wymiana</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Typ sprzedawcy
        </label>
        <Select
          name="seller_type"
          value={formData.seller_type}
          onValueChange={(val) =>
            setFormData({ ...formData, seller_type: val })
          }
        >
          <SelectContent>
            <SelectItem value="private">Osoba Prywatna</SelectItem>
            <SelectItem value="company">Firma</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700">
          Zdjęcia (max 3, wymagane)
        </label>
        <Input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length > 3) {
              alert("Możesz dodać maksymalnie 3 zdjęcia.");
              e.target.value = ""; // wyczyść input
              return;
            }
            setFormData((prev) => ({ ...prev, images: files }));
          }}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        Dodaj Ogłoszenie
      </Button>
    </form>
  );
}
