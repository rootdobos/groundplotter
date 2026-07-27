import { computed, Service, signal } from '@angular/core';

@Service()
export class ElementService {
    elements = signal([
  {
    "id": 1,
    "name": "Bulbasaur",
    "group": "medium",
    "tag": ["Grass", "Poison"]
  },
  {
    "id": 2,
    "name": "Ivysaur",
    "group": "medium",
    "tag": ["Grass", "Poison"]
  },
  {
    "id": 3,
    "name": "Venusaur",
    "group": "large",
    "tag": ["Grass", "Poison"]
  },
  {
    "id": 4,
    "name": "Charmander",
    "group": "small",
    "tag": ["Fire"]
  },
  {
    "id": 5,
    "name": "Charmeleon",
    "group": "medium",
    "tag": ["Fire"]
  },
  {
    "id": 6,
    "name": "Charizard",
    "group": "large",
    "tag": ["Fire", "Flying"]
  },
  {
    "id": 7,
    "name": "Squirtle",
    "group": "small",
    "tag": ["Water"]
  },
  {
    "id": 8,
    "name": "Wartortle",
    "group": "medium",
    "tag": ["Water"]
  },
  {
    "id": 9,
    "name": "Blastoise",
    "group": "large",
    "tag": ["Water"]
  },
  {
    "id": 10,
    "name": "Caterpie",
    "group": "small",
    "tag": ["Bug"]
  }
])
groups = computed( ()=>{
    const all = this.elements().map(p =>p.group);
    return [...new Set(all)];
})
}
