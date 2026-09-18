<?php 

class Destinazione {
    public function __construct(
        public int $id,
        public string $titolo,
        public string $descrizione,
        public ?string $immagine,
        public int $prezzo
    ) {}

    public function toArray(): array {
        return [
            'id' => $this->id,
            'titolo' => $this->titolo,
            'descrizione' => $this->descrizione,
            'immagine' => $this->immagine,
            'prezzo' => $this->prezzo
        ];
    }

}