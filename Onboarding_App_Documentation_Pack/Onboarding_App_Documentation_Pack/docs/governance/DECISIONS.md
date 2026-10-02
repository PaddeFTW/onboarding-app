# Decisions



## Status



Detta dokument innehåller produkt- och arkitekturbeslut. Beslut markerade som rekommenderade är inte implementerade ännu om inget annat anges.



## Version 1.0



- Version 1.0 är låst.

- Release Candidate 1 är verifierad.

- Ingen funktionell förändring ska göras i Version 1.0 utan nytt uttryckligt beslut.



## Hybrid Foundation — beslut (Del 1)



### 1. Hybridmodell används



Status: Beslutat och påbörjat.



Beslut: Startsida och översikter behålls. Genomförandet introduceras som guidat flöde steg för steg, parallellt med befintlig checklista tills vidare beslut.



### 2. Översikter behålls



Status: Beslutat.



Beslut: Pågående och slutförda onboardingprocesser på startsidan ändras inte. Guidat flöde nås via en tydligt märkt förhandsvisning.



### 3. Genomförandet visar ett steg i taget



Status: Beslutat och implementerat i Del 1.



Beslut: Deltagaren ser ett huvudsakligt steg per skärm med tydlig huvudhandling.



### 4. Stegbank används i stället för frågebank



Status: Beslutat.



Beslut: Onboarding beskrivs som steg med typer, inte enbart som frågor.



### 5. Första versionen använder fyra stegtyper



Status: Beslutat och implementerat i Del 1.



Beslut: Endast `information`, `confirmation`, `singleChoice` och `task` implementeras nu.



### 6. Mall och onboardinginstans separeras



Status: Beslutat (domänmodell); Del 1 använder mockdata utan permanent mallagring.



Beslut: Innehåll (mall) och genomförande (instans) är separata begrepp.



### 7. Startad onboarding ska senare använda snapshot



Status: Rekommenderat, inte implementerat för permanent lagring.



Beslut: Pågående och slutförda processer ska frysa mallinnehåll vid start. Del 1 materialiserar steg från mockdata som en enkel snapshot.



### 8. Deltagarupplevelsen ska hållas enklare än administrationen



Status: Beslutat.



Beslut: Ingen administratörsvy byggs i Del 1. Deltagarflödet prioriteras.



### 9. Befintlig design ska återanvändas



Status: Beslutat och implementerat i Del 1.



Beslut: `Card`, `Button`, `Progress`, `Sheet`, `Badge`, `PageContainer` och befintliga färg- och layoutprinciper återanvänds.



### 10. Inga nya paket installeras för första vertikala delen



Status: Beslutat.



Beslut: Del 1 lägger inte till npm-beroenden.



## Sprint 0-beslut för senare delar



### 11. Nästa version använder företagsisolering



Status: Rekommenderat, inte implementerat.



Beslut: Nästa version ska vara multi-tenant med `company_id`.



### 12. Tre kundroller används



Status: Rekommenderat, inte implementerat.



Beslut: Företagsadministratör, ansvarig chef och deltagare.



### 13. Systemmall och företagsmall separeras



Status: Rekommenderat, inte implementerat.



### 14. Publicerade mallversioner är skrivskyddade



Status: Rekommenderat, inte implementerat.



### 15. Varje onboarding får snapshot (permanent)



Status: Rekommenderat, inte implementerat i Supabase.



### 16. Slutförda onboardingprocesser låses



Status: Rekommenderat, inte implementerat.



### 17. Dokument versionshanteras



Status: Rekommenderat, inte implementerat.



### 18. Supabase rekommenderas för autentisering, databas och fillagring



Status: Rekommenderat, inte implementerat för guidade instanser.



### 19. RLS ska användas



Status: Rekommenderat, inte implementerat.



### 20. PDF prioriteras före Word och e-post



Status: Rekommenderat, inte implementerat för nästa versions export.

