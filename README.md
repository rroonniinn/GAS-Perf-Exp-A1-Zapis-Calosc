# GAS | Perf. Exp | A1 - Zapis
## Test najskuteczniejszej metody zapisu danych


#### Cel
Poznanie czasów zapisu danych dla:
1. Różnych struktur arkuszy (internal, external, cache)
2. Różnych wielkości arkuszy (zestawu danych)"

#### Zadanie
1. Zapisanie losowej tablicy danych do istniejącego źródła.
2. Losowa tablica jest generowana w pamięci (czas tej operacji jest znikomy więc nie bieżemy jej pod uwagę)
3. Wklejana jest cała tablica 1:1.
4. Zakres docelowego arkusza jest równy wymiarowi danych - nie są dodawane nowe wiersze ani kolumny"


#### Próbki / sample
Arkusze o 15 kolumnach, o różnej liczbie wierszy: od 100 do 16 000

#### Struktura
1. Loc
2. Hub
3. Ext
4. Cache

#### Warianty:
##### Dla Loc, Hub, Ext:
Wklejenie danych za pomocą customowej, własnej metody paste w 3 opcjach:
- 1. 'nothing', w której wyłączone są wszystkie opcje
- 2. 'dafaut' - na ustawieniach domyślnych
- 3. 'full' - na ustawieniach pełnych
- 4. 'native F' - (full) wklejenie metodą natywną w notacji pełnej: np. 'A1:O400'
- 5. 'native S' - (short) wklejenie metodą natywną w notacji krótkiej: np. 'A1:O'


#### Plik
Dashboard: https://docs.google.com/spreadsheets/d/12nhC5N4ACni30RwQZ6iRuukwFjMG3VZBS5vqOZfqjvM/edit#gid=880283590
