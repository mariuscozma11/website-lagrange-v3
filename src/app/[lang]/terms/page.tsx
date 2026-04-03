import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - Lagrange Engineering",
  description: "Terms and Conditions for Lagrange Engineering SRL services",
};

function EnglishContent() {
  return (
    <>
      <h1>Terms and Conditions</h1>
      <p className="text-neutral-500 dark:text-neutral-400">Last updated April 03, 2026</p>

      <p>These Terms and Conditions (&quot;Terms&quot;) govern the relationship between <strong>Lagrange Engineering SRL</strong>, a company registered in Romania under CUI 51196824, with its registered office at Str. Ioan Alexandru 20, Timisoara, Timis 300323, Romania (&quot;Lagrange,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), and you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) regarding the use of our website and the provision of our services.</p>
      <p>By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.</p>

      <h2>1. Services</h2>
      <p>Lagrange Engineering provides custom software development services, including but not limited to: AI &amp; machine learning solutions, web application development, mobile application development, and technical consulting (&quot;Services&quot;).</p>
      <p>The specific scope, deliverables, timeline, and pricing for each project are defined in individual proposals or contracts (&quot;Project Agreement&quot;) agreed upon by both parties. In case of any conflict between these Terms and a Project Agreement, the Project Agreement shall prevail.</p>

      <h2>2. Proposals and Acceptance</h2>
      <p>Proposals provided by Lagrange Engineering are valid for 30 (thirty) calendar days from the date of issuance, unless otherwise stated in the proposal.</p>
      <p>A proposal is considered accepted when the Client provides written confirmation (including email) or makes the first payment as outlined in the proposal. Acceptance of a proposal constitutes agreement to the scope, timeline, pricing, and these Terms.</p>

      <h2>3. Payment Terms</h2>
      <p>Payment terms are specified in each Project Agreement. Unless otherwise agreed:</p>
      <ul>
        <li>Invoices are due within 14 (fourteen) calendar days from the date of issuance.</li>
        <li>All prices are stated in the currency specified in the Project Agreement and are exclusive of VAT, which will be added where applicable under Romanian law.</li>
        <li>Late payments may incur a penalty of 0.1% per day of delay, in accordance with Romanian legislation on combating late payment (Law 72/2013).</li>
        <li>Lagrange Engineering reserves the right to suspend work on a project if invoices remain unpaid for more than 30 (thirty) days beyond their due date.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>Upon full payment of all amounts due under a Project Agreement:</p>
      <ul>
        <li>The Client shall receive full ownership of all custom code, designs, and deliverables specifically created for the project (&quot;Project IP&quot;).</li>
        <li>Lagrange Engineering retains ownership of any pre-existing tools, libraries, frameworks, and general-purpose code (&quot;Lagrange IP&quot;) used in the project. The Client is granted a non-exclusive, perpetual, royalty-free license to use Lagrange IP as part of the delivered project.</li>
        <li>Third-party software and open-source components used in the project remain subject to their respective licenses.</li>
      </ul>
      <p>Until full payment is received, all intellectual property rights in the deliverables remain with Lagrange Engineering.</p>

      <h2>5. Confidentiality</h2>
      <p>Both parties agree to keep confidential any proprietary information, trade secrets, technical data, business plans, or other sensitive information disclosed during the course of the engagement (&quot;Confidential Information&quot;).</p>
      <p>This obligation of confidentiality shall survive the termination of the engagement for a period of 2 (two) years, unless the information becomes publicly available through no fault of the receiving party.</p>
      <p>Lagrange Engineering reserves the right to mention the Client&apos;s name and a general description of the project in its portfolio and marketing materials, unless the Client explicitly requests otherwise in writing.</p>

      <h2>6. Project Timeline and Delivery</h2>
      <p>Timelines provided in proposals and Project Agreements are good-faith estimates based on the information available at the time. They are not guaranteed deadlines unless explicitly stated as such.</p>
      <p>Delays caused by the Client (including but not limited to: late feedback, delayed content or asset delivery, scope changes, or unavailability of key stakeholders) may result in a corresponding extension of the project timeline.</p>
      <p>Lagrange Engineering will communicate proactively about any anticipated delays and work with the Client to find reasonable solutions.</p>

      <h2>7. Change Requests</h2>
      <p>Any changes to the agreed scope of work must be requested in writing and acknowledged by Lagrange Engineering. Changes may affect the project timeline and cost.</p>
      <p>Lagrange Engineering will provide an estimate for the impact of the requested changes before proceeding. Work on change requests will only begin after written approval from the Client.</p>

      <h2>8. Warranties</h2>
      <p>Lagrange Engineering warrants that:</p>
      <ul>
        <li>The Services will be performed in a professional and workmanlike manner, consistent with industry standards.</li>
        <li>The deliverables will substantially conform to the specifications outlined in the Project Agreement for the warranty period defined in the respective Project Agreement or specifications document (&quot;caiet de sarcini&quot;) (&quot;Warranty Period&quot;). If no warranty period is specified, a default of 30 (thirty) calendar days from delivery shall apply.</li>
        <li>During the Warranty Period, Lagrange Engineering will correct any defects or bugs at no additional cost, provided the issues are caused by Lagrange Engineering&apos;s work and not by modifications made by the Client or third parties.</li>
      </ul>
      <p>Beyond the Warranty Period, maintenance and support are available under separate agreements.</p>

      <h2>9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by Romanian law:</p>
      <ul>
        <li>Lagrange Engineering&apos;s total liability under any Project Agreement shall not exceed the total amounts paid by the Client under that specific agreement.</li>
        <li>Lagrange Engineering shall not be liable for any indirect, incidental, consequential, or special damages, including but not limited to: loss of profits, loss of data, business interruption, or loss of business opportunities.</li>
        <li>Lagrange Engineering shall not be liable for damages arising from the Client&apos;s misuse of the deliverables, modifications made by third parties, or failure to maintain adequate backups.</li>
      </ul>

      <h2>10. Termination</h2>
      <p>Either party may terminate a Project Agreement with 15 (fifteen) calendar days&apos; written notice.</p>
      <p>In the event of termination:</p>
      <ul>
        <li>The Client shall pay for all work completed up to the date of termination, including any committed expenses.</li>
        <li>Upon payment, the Client receives ownership of all deliverables completed up to the termination date.</li>
        <li>Any advance payments for work not yet performed will be refunded, minus a reasonable amount for administrative costs and work-in-progress.</li>
      </ul>
      <p>Either party may terminate immediately if the other party materially breaches these Terms or a Project Agreement and fails to remedy such breach within 15 (fifteen) calendar days of written notice.</p>

      <h2>11. Force Majeure</h2>
      <p>Neither party shall be liable for delays or failure to perform resulting from events beyond their reasonable control, including but not limited to: natural disasters, war, government actions, epidemics, internet or power outages, or other similar events (&quot;Force Majeure&quot;).</p>
      <p>The affected party must notify the other party promptly and take reasonable steps to mitigate the impact. If a Force Majeure event continues for more than 60 (sixty) days, either party may terminate the affected Project Agreement without penalty.</p>

      <h2>12. Website Use</h2>
      <p>The content on our website (including text, images, code, case studies, and blog articles) is provided for informational purposes only. While we strive to keep information accurate and up to date, we make no warranties about the completeness or accuracy of website content.</p>
      <p>You may not reproduce, distribute, or create derivative works from our website content without our prior written consent.</p>

      <h2>13. Contact Form and Communications</h2>
      <p>When you submit information through our contact form, you consent to us using the provided information (name, email, phone number, company, message) to respond to your inquiry. We process this data in accordance with our <Link href="/en/privacy-policy">Privacy Policy</Link>.</p>

      <h2>14. Governing Law and Jurisdiction</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of Romania.</p>
      <p>Any disputes arising from or in connection with these Terms or any Project Agreement shall first be attempted to be resolved amicably through direct negotiation. If no resolution is reached within 30 (thirty) calendar days, the dispute shall be submitted to the competent courts of Timisoara, Romania.</p>

      <h2>15. Amendments</h2>
      <p>Lagrange Engineering reserves the right to modify these Terms at any time. The updated version will be posted on our website with a revised &quot;Last updated&quot; date.</p>
      <p>For active projects, any material changes to these Terms will be communicated to the Client in writing and will only apply to new work or Project Agreements entered into after the change.</p>

      <h2>16. Severability</h2>
      <p>If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.</p>

      <h2>17. Contact and Company Details</h2>
      <p>
        <strong>Lagrange Engineering SRL</strong><br />
        Jud. Timiș, Municipiul Timișoara<br />
        Str. Ioan Alexandru, Nr. 20, Etaj POD, Ap. POD 2<br /><br />
        Email: <a href="mailto:office@lagrangeengineering.ro">office@lagrangeengineering.ro</a><br />
        Phone: <a href="tel:+40756109881">+40 756 109 881</a><br /><br />
        CUI: 51196824<br />
        ROONRC: J20505646004<br />
        Bank account: RO83BTRLRONCRT0CW7734901
      </p>
    </>
  );
}

function RomanianContent() {
  return (
    <>
      <h1>Termeni și Condiții</h1>
      <p className="text-neutral-500 dark:text-neutral-400">Ultima actualizare: 3 aprilie 2026</p>

      <p>Acești Termeni și Condiții (&quot;Termeni&quot;) guvernează relația dintre <strong>Lagrange Engineering SRL</strong>, o companie înregistrată în România sub CUI 51196824, cu sediul social la Str. Ioan Alexandru 20, Timișoara, Timiș 300323, România (&quot;Lagrange,&quot; &quot;noi&quot; sau &quot;al nostru&quot;), și dumneavoastră (&quot;Client,&quot; &quot;dumneavoastră&quot;) privind utilizarea site-ului nostru și furnizarea serviciilor noastre.</p>
      <p>Prin accesarea site-ului nostru sau angajarea serviciilor noastre, sunteți de acord să respectați acești Termeni. Dacă nu sunteți de acord cu vreo parte a acestor Termeni, vă rugăm să nu utilizați site-ul sau serviciile noastre.</p>

      <h2>1. Servicii</h2>
      <p>Lagrange Engineering furnizează servicii de dezvoltare software personalizat, inclusiv dar fără a se limita la: soluții AI și machine learning, dezvoltare aplicații web, dezvoltare aplicații mobile și consultanță tehnică (&quot;Servicii&quot;).</p>
      <p>Scopul specific, livrabilele, termenele și prețurile pentru fiecare proiect sunt definite în propuneri individuale sau contracte (&quot;Acord de Proiect&quot;) convenite de ambele părți. În caz de conflict între acești Termeni și un Acord de Proiect, Acordul de Proiect va prevala.</p>

      <h2>2. Propuneri și Acceptare</h2>
      <p>Propunerile furnizate de Lagrange Engineering sunt valabile 30 (treizeci) de zile calendaristice de la data emiterii, cu excepția cazului în care se prevede altfel în propunere.</p>
      <p>O propunere este considerată acceptată când Clientul furnizează o confirmare scrisă (inclusiv email) sau efectuează prima plată conform propunerii. Acceptarea unei propuneri constituie acordul privind scopul, termenele, prețurile și acești Termeni.</p>

      <h2>3. Condiții de Plată</h2>
      <p>Condițiile de plată sunt specificate în fiecare Acord de Proiect. Cu excepția cazului în care se convine altfel:</p>
      <ul>
        <li>Facturile sunt scadente în termen de 14 (paisprezece) zile calendaristice de la data emiterii.</li>
        <li>Toate prețurile sunt exprimate în moneda specificată în Acordul de Proiect și nu includ TVA, care va fi adăugat unde este aplicabil conform legislației române.</li>
        <li>Plățile întârziate pot atrage o penalitate de 0,1% pe zi de întârziere, în conformitate cu legislația română privind combaterea întârzierilor la plată (Legea 72/2013).</li>
        <li>Lagrange Engineering își rezervă dreptul de a suspenda lucrările la un proiect dacă facturile rămân neachitate mai mult de 30 (treizeci) de zile după data scadenței.</li>
      </ul>

      <h2>4. Proprietate Intelectuală</h2>
      <p>La plata integrală a tuturor sumelor datorate în cadrul unui Acord de Proiect:</p>
      <ul>
        <li>Clientul va primi proprietatea deplină asupra întregului cod personalizat, design și livrabile create specific pentru proiect (&quot;IP Proiect&quot;).</li>
        <li>Lagrange Engineering își păstrează proprietatea asupra oricăror instrumente, biblioteci, framework-uri și cod de uz general preexistente (&quot;IP Lagrange&quot;) utilizate în proiect. Clientul primește o licență neexclusivă, perpetuă și f��ră redevențe pentru utilizarea IP Lagrange ca parte a proiectului livrat.</li>
        <li>Software-ul terț și componentele open-source utilizate în proiect rămân supuse licențelor respective.</li>
      </ul>
      <p>Până la primirea plății integrale, toate drepturile de proprietate intelectuală asupra livrabilelor rămân la Lagrange Engineering.</p>

      <h2>5. Confidențialitate</h2>
      <p>Ambele părți sunt de acord să păstreze confidențiale orice informații proprietare, secrete comerciale, date tehnice, planuri de afaceri sau alte informații sensibile dezvăluite pe parcursul angajamentului (&quot;Informații Confidențiale&quot;).</p>
      <p>Această obligație de confidențialitate va supraviețui încetării angajamentului pentru o perioadă de 2 (doi) ani, cu excepția cazului în care informațiile devin disponibile public fără vina părții receptoare.</p>
      <p>Lagrange Engineering își rezervă dreptul de a menționa numele Clientului și o descriere generală a proiectului în portofoliul și materialele de marketing, cu excepția cazului în care Clientul solicită explicit altfel în scris.</p>

      <h2>6. Termene de Proiect și Livrare</h2>
      <p>Termenele furnizate în propuneri și Acorduri de Proiect sunt estimări de bună-credință bazate pe informațiile disponibile la momentul respectiv. Nu sunt termene garantate decât dacă sunt declarate explicit ca atare.</p>
      <p>Întârzierile cauzate de Client (inclusiv dar fără a se limita la: feedback întârziat, livrare întârziată de conținut sau materiale, modificări de scop sau indisponibilitatea persoanelor cheie) pot duce la o prelungire corespunzătoare a termenului proiectului.</p>
      <p>Lagrange Engineering va comunica proactiv despre orice întârzieri anticipate și va colabora cu Clientul pentru a găsi soluții rezonabile.</p>

      <h2>7. Solicitări de Modificare</h2>
      <p>Orice modificare a scopului convenit trebuie solicitată în scris și confirmată de Lagrange Engineering. Modificările pot afecta termenul și costul proiectului.</p>
      <p>Lagrange Engineering va furniza o estimare a impactului modificărilor solicitate înainte de a proceda. Lucrările la modificări vor începe doar după aprobarea scrisă a Clientului.</p>

      <h2>8. Garanții</h2>
      <p>Lagrange Engineering garantează că:</p>
      <ul>
        <li>Serviciile vor fi executate într-o manieră profesionistă, în conformitate cu standardele industriei.</li>
        <li>Livrabilele vor corespunde în mod substanțial specificațiilor din Acordul de Proiect pe perioada de garanție definită în Acordul de Proiect sau în caietul de sarcini respectiv (&quot;Perioada de Garanție&quot;). Dacă nu este specificată nicio perioadă de garanție, se va aplica o perioadă implicită de 30 (treizeci) de zile calendaristice de la livrare.</li>
        <li>Pe durata Perioadei de Garanție, Lagrange Engineering va corecta orice defecte sau erori fără costuri suplimentare, cu condiția ca problemele să fie cauzate de lucrarea Lagrange Engineering și nu de modificări efectuate de Client sau terți.</li>
      </ul>
      <p>După Perioada de Garanție, mentenanța și suportul sunt disponibile pe baza unor acorduri separate.</p>

      <h2>9. Limitarea R��spunderii</h2>
      <p>În limita maximă permisă de legislația română:</p>
      <ul>
        <li>Răspunderea totală a Lagrange Engineering în cadrul oricărui Acord de Proiect nu va depăși sumele totale plătite de Client în cadrul acelui acord specific.</li>
        <li>Lagrange Engineering nu va fi răspunzătoare pentru daune indirecte, incidentale, consecutive sau speciale, inclusiv dar fără a se limita la: pierderi de profit, pierderi de date, întreruperea activității sau pierderea oportunităților de afaceri.</li>
        <li>Lagrange Engineering nu va fi răspunzătoare pentru daune rezultate din utilizarea necorespunzătoare a livrabilelor de către Client, modificări efectuate de terți sau neîntreținerea unor copii de siguranță adecvate.</li>
      </ul>

      <h2>10. Reziliere</h2>
      <p>Oricare dintre părți poate rezilia un Acord de Proiect cu un preaviz scris de 15 (cincisprezece) zile calendaristice.</p>
      <p>În cazul rezilierii:</p>
      <ul>
        <li>Clientul va plăti pentru toate lucrările finalizate până la data rezilierii, inclusiv cheltuielile angajate.</li>
        <li>La efectuarea plății, Clientul primește proprietatea tuturor livrabilelor finalizate până la data rezilierii.</li>
        <li>Orice plăți în avans pentru lucrări neefectuate vor fi rambursate, minus o sumă rezonabilă pentru costuri administrative și lucrări în desfășurare.</li>
      </ul>
      <p>Oricare dintre părți poate rezilia imediat dacă cealaltă parte încalcă în mod substanțial acești Termeni sau un Acord de Proiect și nu remediază încălcarea în termen de 15 (cincisprezece) zile calendaristice de la notificarea scrisă.</p>

      <h2>11. Forță Majoră</h2>
      <p>Niciuna dintre părți nu va fi răspunzătoare pentru întârzieri sau neexecutare rezultate din evenimente în afara controlului lor rezonabil, inclusiv dar fără a se limita la: dezastre naturale, război, acțiuni guvernamentale, epidemii, întreruperi de internet sau curent, sau alte evenimente similare (&quot;Forță Majoră&quot;).</p>
      <p>Partea afectată trebuie să notifice prompt cealaltă parte și să ia măsuri rezonabile pentru a atenua impactul. Dacă un eveniment de Forță Majoră continuă mai mult de 60 (șaizeci) de zile, oricare dintre părți poate rezilia Acordul de Proiect afectat fără penalități.</p>

      <h2>12. Utilizarea Site-ului</h2>
      <p>Conținutul de pe site-ul nostru (inclusiv text, imagini, cod, studii de caz și articole de blog) este furnizat doar în scop informativ. Deși ne străduim să menținem informațiile precise și actualizate, nu oferim garanții privind completitudinea sau acuratețea conținutului.</p>
      <p>Nu aveți dreptul de a reproduce, distribui sau crea lucrări derivate din conținutul site-ului nostru fără consimțământul nostru scris prealabil.</p>

      <h2>13. Formularul de Contact și Comunicări</h2>
      <p>Când trimiteți informații prin formularul nostru de contact, consimțiți ca noi să utilizăm informațiile furnizate (nume, email, telefon, companie, mesaj) pentru a răspunde solicitării dumneavoastră. Prelucrăm aceste date în conformitate cu <Link href="/ro/privacy-policy">Politica de Confidențialitate</Link>.</p>

      <h2>14. Legea Aplicabilă și Jurisdicția</h2>
      <p>Acești Termeni vor fi guvernați și interpretați în conformitate cu legile României.</p>
      <p>Orice dispute decurgând din sau în legătură cu acești Termeni sau orice Acord de Proiect vor fi mai întâi încercate a fi rezolvate pe cale amiabilă prin negociere directă. Dacă nu se ajunge la o rezolvare în termen de 30 (treizeci) de zile calendaristice, disputa va fi supusă instanțelor competente din Timișoara, România.</p>

      <h2>15. Modificări</h2>
      <p>Lagrange Engineering își rezervă dreptul de a modifica acești Termeni în orice moment. Versiunea actualizată va fi publicată pe site-ul nostru cu o dată revizuită de &quot;Ultima actualizare&quot;.</p>
      <p>Pentru proiectele active, orice modificări substanțiale ale acestor Termeni vor fi comunicate Clientului în scris și se vor aplica doar lucrărilor noi sau Acordurilor de Proiect încheiate după modificare.</p>

      <h2>16. Separabilitate</h2>
      <p>Dacă orice prevedere a acestor Termeni este considerată invalidă sau inaplicabilă de o instanță competentă, prevederile rămase vor continua să fie pe deplin valabile și aplicabile.</p>

      <h2>17. Contact și Date Firmă</h2>
      <p>
        <strong>Lagrange Engineering SRL</strong><br />
        Jud. Timiș, Municipiul Timișoara<br />
        Str. Ioan Alexandru, Nr. 20, Etaj POD, Ap. POD 2<br /><br />
        Email: <a href="mailto:office@lagrangeengineering.ro">office@lagrangeengineering.ro</a><br />
        Telefon: <a href="tel:+40756109881">+40 756 109 881</a><br /><br />
        CUI: 51196824<br />
        ROONRC: J20505646004<br />
        Cont bancar: RO83BTRLRONCRT0CW7734901
      </p>
    </>
  );
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        {lang === "ro" ? <RomanianContent /> : <EnglishContent />}
      </div>
    </article>
  );
}
