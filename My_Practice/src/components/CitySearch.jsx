import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Search, MapPin, Star } from "lucide-react";
import { Badge } from "./ui/badge";

const popularCities = [
  { name: "London", country: "United Kingdom", region: "England" },
  { name: "New York", country: "United States", region: "New York" },
  { name: "Tokyo", country: "Japan", region: "Kanto" },
  { name: "Paris", country: "France", region: "Île-de-France" },
  { name: "Sydney", country: "Australia", region: "New South Wales" },
  { name: "Dubai", country: "United Arab Emirates", region: "Dubai" },
];

export function CitySearch({ onCitySelect, currentCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const mockResults = [
          { name: "Los Angeles", country: "United States", region: "California" },
          { name: "Berlin", country: "Germany", region: "Berlin" },
          { name: "Singapore", country: "Singapore", region: "Central Region" },
          { name: "Mumbai", country: "India", region: "Maharashtra" },
          { name: "Toronto", country: "Canada", region: "Ontario" },
        ].filter((city) =>
          city.name.toLowerCase().includes(term.toLowerCase()) ||
          city.country.toLowerCase().includes(term.toLowerCase())
        );
        setSuggestions(mockResults);
        setIsSearching(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for cities..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10">
                {suggestions.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-2 text-left hover:bg-muted flex items-center space-x-2 border-b border-border last:border-b-0"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{city.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {city.region}, {city.country}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Popular Cities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city, index) => (
                <Badge
                  key={index}
                  variant={city.name === currentCity ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleCitySelect(city)}
                >
                  {city.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}