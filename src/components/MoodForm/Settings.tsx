import { useState, useEffect } from "react";

const SETTINGS = [
  "male",
  "danceable",
  "tonal",
  "timbre_bright",
  "instrumental",
  "mood_acoustic",
  "mood_aggressive",
  "mood_electronic",
  "mood_happy",
  "mood_party",
  "mood_relaxed",
  "mood_sad",
];

const Settings = () => {
  const [preferences, setPreferences] = useState<{ [key: string]: number }>({});

  // Cargar preferencias desde localStorage al iniciar
  useEffect(() => {
    const savedPreferences = localStorage.getItem("moodtune_settings");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    } else {
      const defaultPreferences = SETTINGS.reduce((acc, setting) => {
        acc[setting] = 50; // Valor por defecto
        return acc;
      }, {} as { [key: string]: number });
      setPreferences(defaultPreferences);
    }
  }, []);

  // Guardar automáticamente cuando cambian los valores
  useEffect(() => {
    if (Object.keys(preferences).length > 0) {
      localStorage.setItem("moodtune_settings", JSON.stringify(preferences));
    }
  }, [preferences]); // Se ejecuta cada vez que `preferences` cambia

  // Manejar cambio en sliders
  const handleChange = (setting: string, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Configuración de MoodTune</h2>
      {SETTINGS.map((setting) => (
        <div key={setting} className="mb-4">
          <label className="block mb-1 text-sm capitalize">
            {setting.replace("_", " ")}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={preferences[setting] || 50}
            onChange={(e) => handleChange(setting, Number(e.target.value))}
            className="w-full cursor-pointer"
          />
          <span className="text-sm">{preferences[setting]}%</span>
        </div>
      ))}
    </div>
  );
};

export default Settings;
