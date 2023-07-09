const jsonString = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;

   const jsonObject = JSON.parse(jsonString);

   for (let i = 0; i < jsonObject.list.length; i++) {
     const person = jsonObject.list[i];
     person.age = parseInt(person.age);
   }

   console.log(jsonObject); 