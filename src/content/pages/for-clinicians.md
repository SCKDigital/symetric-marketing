---
title: "The science behind symetric"
description: "What symetric measures, the evidence-based reasoning behind how it's built, and what the app deliberately does not claim."
label: "A reference for clinicians"
---

A patient of yours may have sent you this page, or handed you a symetric report at an appointment. This document sets out what the app measures, the reasoning and published evidence behind how it's built, and what it deliberately does not claim. It describes the approach at the level a clinician needs to weigh the report, not the underlying implementation.

Where clinical evidence is cited, it has been drawn from the populations who actually use this app: ADHD, autism, mood disorders, POTS, ME/CFS, long COVID and hypermobility spectrum disorders.

**The one sentence version:** symetric runs no machine learning and no population level medical models. Everything it detects is a personal baseline comparison, computed with standard statistical methods, over data the patient logged about themselves. Nothing is inferred from other people's data, and nothing constitutes a diagnosis.

---

## 1. What the app measures

Everything logged is self reported, on a schedule the patient sets rather than one the app imposes.

**Mind domains.** Up to eight (mood, energy, anxiety, concentration, irritability, social depletion, sensory overwhelm, motivation). Patients select between two and eight to track. Logged several times a day, at roughly 20 to 30 seconds per check in.

**Sleep.** Logged once daily regardless of which mind domains are selected: a subjective sleep quality rating plus an optional hours slept figure.

**Body domains (optional).** Nine symptom domains (fatigue across the day, joint and muscle pain, widespread pain, joint instability, breathlessness, orthostatic symptoms, gut symptoms, brain fog, end of day exhaustion) and seven loggable events (joint subluxation, presyncope episode, migraine onset, crash, reaction, injury or strain, palpitations), for patients who opt in. End of day exhaustion is asked every evening; the rest are chosen by the patient, and an optional morning check-in repeats up to four of them on waking so morning and evening readings can be compared. Pain and instability can be located on a body map, and pain and breathlessness described with character words (for example aching, burning, electric or shooting), which the report lists by date alongside the scores.

**Day 1 cycle logging (optional).** The date a period starts, and nothing else. The app counts days since that date and resets on the next entry. It does not estimate cycle phase and does not predict a next date.

**Medication and intervention markers.** Dose changes, therapy starts and other life events, logged as dated markers on the same timeline as the symptom data rather than in a separate log.

---

## 2. Why frequent check ins rather than one retrospective form

The design follows Ecological Momentary Assessment (EMA), the research methodology of repeated real time sampling of a person's state in their own environment, close to the moment it occurs, rather than asking them to reconstruct it later from memory [1].

The problem this addresses is well characterised. Retrospective symptom recall is systematically distorted rather than merely noisy: recall of depressive symptoms on the PHQ-9 is disproportionately weighted towards peak and most recent experiences rather than towards the true average across the recall window [2]. The distortion compounds in conditions where the symptoms themselves are unstable. Intensive longitudinal sampling in long COVID found substantial variation in core symptoms both within a single day and between days [3], which means a patient asked to summarise the last three months is being asked to average a quantity that has no stable value, under time pressure, from memory.

EMA is not free of trade offs, and its validity is conditional on design [1]. The dominant constraint is participant burden: across research fields, compliance falls as instruments lengthen and as per prompt effort rises [4], and momentary state itself predicts adherence, so the patients whose data would be most informative are often the least able to sustain a heavy protocol [5]. This is why the short check in is a deliberate design constraint rather than a convenience.

**Implementation.** Check ins are scheduled several times per day, at a user configurable frequency, inside a user chosen active window set during onboarding. Each is prompted in the moment. Check in windows are timezone aware and allow a short grace period for a late entry, so a delayed response is neither silently dropped nor miscounted.

---

## 3. Personal baselines, not population norms

Every deviation the app flags is relative to that patient's own recent history. There is no population norm, no age or sex adjusted reference range, and no externally sourced cut off anywhere in the system. There is no concept of "normal"; only "normal for this person, recently".

This is a deliberate alignment with the idiographic tradition in intensive longitudinal research, which has grown substantially over the last decade in response to a recurring finding: relationships estimated across a population frequently fail to describe any particular individual within it [6,7]. The same logic underpins N-of-1 methodology, where the individual is the unit of analysis and each patient serves as their own control [8].

The baseline is calculated as a **median** of the patient's own recent scores, rather than a mean, deliberately. A mean is dragged by a single severe flare day; a median largely ignores it. In populations where day to day symptom variability is high and a very bad day is a routine rather than exceptional event, this matters. Within person variability in fatigue, pain, dizziness and cognitive symptoms is substantial and well documented in long COVID [3], and momentary sampling in people with a history of COVID-19 infection detects real world ache and fatigue attributable to long COVID rather than to baseline mental health [9]. A measure of central tendency that is sensitive to single extreme values would misrepresent that population's typical state.

Baselines update on a rolling basis as new data comes in, so they stay current without being reset by any single day. A new patient is not asked to estimate their own baseline: each domain starts from a neutral placeholder, which is superseded by their real check in history once enough of it exists. An estimate made before anything has been logged was found to produce a number no one could stand behind.

---

## 4. How patterns are detected

The app looks for a small number of well established shapes in a patient's own logged history: a meaningful, sustained shift away from their personal baseline in one area; a large swing within a single day; a recurring back and forth over a short window; and, where there's enough data, a tendency for a domain to run higher or lower at a particular time of day.

Two things are worth being precise about.

**Every pattern must clear a data sufficiency bar before it is ever shown.** Missing data in EMA is not missing at random. A recent meta-analysis update covering 285 samples and more than 17,000 participants found compliance averaging around 72%, declining over time, and varying systematically with participant characteristics and study design, such that non-response is itself informative and biases naive analyses [15]. Compliance also declines as protocols lengthen and intensify [4], and is predicted by momentary stress and low mood [5]. In a fatiguing illness this is not a marginal effect: data density falls exactly when symptoms are worst, which is exactly when the data would matter most. symetric responds to this by suppressing rather than reporting. A pattern that is real but under logged is withheld entirely rather than shown with a lower confidence label.

**Low effort entries are marked, not hidden.** On a difficult day a patient can switch on a comfort mode that, among other things, lets them record a check in as "nothing unusual" in one tap, which records each domain at that patient's own baseline. These entries are flagged as such, count towards coverage because they are genuine data points, and cap the confidence of any pattern they contribute to at partial. The report states how many entries were made this way.

**Instability is treated as a finding in its own right**, not as noise around a mean. Instability in negative affect predicts depressive and generalised anxiety symptoms even after controlling for the intensity of that affect, meaning the fluctuation itself carries information the average does not [12]. In bipolar disorder, mood instability metrics derived from repeated sampling stratify individuals and track outcomes independently of episode based measures [13]. In ADHD, a systematic review of momentary sampling studies found emotion dysregulation to be reliably observable as within day fluctuation and related to functional impairment, in a way that trait level questionnaire ratings do not capture [14].

Where the app can detect enough check ins across enough days, it also looks at whether a domain tends to run differently at particular times of a patient's own day, since time of day is a genuine and often overlooked source of variation in these conditions. In POTS, the orthostatic heart rate increment itself varies markedly by time of day: in one paediatric cohort, diagnostic criteria were met far more often in the morning than the afternoon or evening [10]. In ME/CFS and post-COVID fatigue syndrome, prospective study of sleep and rhythm parameters shows altered circadian organisation relative to controls [11]. A patient asked at a single clinic appointment how their symptoms are will therefore give an answer partly determined by the hour at which they were asked.

When a shift shows up across several domains at once, it's surfaced with more prominence than a single domain moving on its own. This is ordinary differential reasoning rather than statistical inference: a change appearing across several systems at once is more likely to reflect something worth clinical attention, and it maps onto a well documented problem in exactly these conditions, that presentations spanning multiple systems are the ones most often missed or delayed. In myalgic encephalomyelitis and long COVID, patients report symptom burden spanning multiple physiological systems alongside prolonged and adversarial diagnostic pathways [19]. In hypermobile Ehlers-Danlos syndrome, the mean time to diagnosis has been found to exceed ten years, with pain and fatigue the symptoms that most commonly initiated the search [20]. An Australian POTS registry recorded a comparable picture of high multi-system symptom burden and a protracted diagnostic journey [21]. This weighting is arithmetic applied only to patterns already detected by the rules above. It is not machine learned, and it makes no claim that any domain is medically more important than another in general, only that co-occurrence across systems is worth putting first.

---

## 5. Connections between domains

Where the app looks at whether two tracked domains move together, it uses standard inferential statistics, a correlation coefficient with a genuine significance test, computed the same way any standard statistical package would, rather than a bespoke heuristic. A relationship is only reported once there is enough overlapping data behind it and the relationship is both strong and statistically significant. A connection is also checked for consistency against the same window from the prior month, as a lightweight replication check within one person's own data.

**The underlying statistics are never shown to the patient.** This is a deliberate design rule, not an oversight. The interface surfaces only a qualitative direction, such as "tend to move together", and a confidence label. High frequency health measurement generates a very large number of testable pairwise relationships, and the resulting multiplicity means that conventional significance thresholds applied naively will produce false positives at a rate that is easy to underestimate and easy to present as discovery [16]. Separately, digital phenotyping and digital mental health measures have a documented record of poor replicability and inconsistent reporting, such that no digital marker for mood disorders is currently validated for clinical use [17]. Withholding the raw statistic avoids a lay reader misreading a correlation coefficient as a percentage or a probability, and avoids presenting a threshold gated pattern in one person's self reported history with the visual authority of a clinical measurement.

**Sleep is treated differently, deliberately**, as a comparison between how a domain looks on the patient's better sleep days against their worse ones, rather than a continuous correlation. The clinical question a patient and clinician actually want answered is whether a symptom is worse after a bad night, not how linearly it tracks sleep quality across its full range. The evidence for directionality is stronger in some of these populations than others, and the product's language reflects that: in bipolar disorder, intensive longitudinal sampling shows sleep and mood influencing one another dynamically, with sleep change carrying prospective information about mood state [18]; in ME/CFS and post-COVID fatigue syndrome, disrupted sleep and altered circadian organisation are consistent, well documented features [11], though momentary sampling work has not yet established directionality in those conditions specifically. symetric presents this comparison as an association observed within that patient's own data, never as a causal claim.

Reduced need for sleep, as distinct from insomnia, is a recognised feature of hypomanic and manic states and one of the more reliable prodromal signals detectable by repeated self report [13,18]. Where the app detects energy running higher than usual on days following poor sleep, that specific combination is treated as worth surfacing prominently, as a prompt for clinical attention rather than an assertion about cause.

---

## 6. What this can and cannot tell you

This section is stated as plainly in the product as it is here.

**Nothing here is a diagnosis, a risk score, or a clinical measurement.** Every pattern shown is a comparison against one person's own recent history, and the thresholds behind it are set conservatively, with unreliable patterns suppressed rather than displayed anyway.

**Correlation is not causation**, and the product does not imply otherwise. The interface language is deliberately non-causal, and the underlying statistics are withheld precisely so they cannot be mistaken for something more definitive than they are [16,17].

**All of it depends on logging adherence.** A pattern that is real but under-logged is withheld rather than shown with false confidence. symetric is therefore tuned to under-report rather than over-report. This is the correct failure direction for a tool that may end up in a consultation, but it does mean sparse loggers will see fewer patterns rather than lower confidence ones. Given what is known about differential attrition in momentary sampling [15], an absence of findings should not be read as an absence of symptoms, particularly in a fatiguing illness where the worst periods are the least likely to be logged.

**Everything is single subject.** There is no comparison against other users, no population baseline and no epidemiological data anywhere in the pipeline. Every figure in a symetric report is computed from, and compared against, that one patient's logged history.

**Clinicians are not obliged to take the report at face value, and should not.** A systematic review of how health care professionals actually use patient generated health data from consumer grade devices found that its value in the clinic depends heavily on whether the provenance and completeness of the data are legible to the reader, and that unexplained or unqualified figures are the main reason such data is discounted [22]. Surveyed professionals are broadly positive about app derived data whilst consistently naming reliability, interpretability and workflow fit as the conditions for using it [23]. symetric's response is the approach described throughout this document: every pattern is shown with the evidence behind it, and findings resting on insufficient data are withheld rather than qualified.

**The app is not a substitute for clinical judgement**, and the report is not a clinical instrument. Its intended function is closer to that of a structured symptom diary: giving the consultation a legible, dated, self reported record in place of unaided recall. Structured patient reported data used this way has a reasonable evidence base for improving symptom detection and the quality of clinician and patient communication, whilst the evidence for direct effects on clinical outcomes remains more mixed and implementation dependent [24,25].

---

## 7. Where the computation runs, and how data is handled

All calculation described above happens on the patient's device. No data is sent to a language model or to any third party for interpretation.

Entries are stored in an encrypted, per account database, access isolated so that no other user and no unauthenticated request can reach them. Nothing is sold, shared or used for advertising.

This is not a trivial commitment in context. A cross sectional analysis of 20,991 mHealth apps found that 88% contained code capable of collecting user data, with the majority of collection operations routing to third parties, and fewer than half of observed data transmissions matching the app's own stated privacy policy [26]. In women's health apps specifically, a scoping review found that only 70% displayed a privacy policy at all and 13% began collecting data before obtaining consent [27]. Clinicians assessing whether to recommend any symptom tracking tool should treat data handling as a first order question rather than a footnote.

Check ins also carry an edit history, so a revised entry remains distinguishable from the original. This matters for anyone reading the record as evidence.

---

## 8. A note on optional cycle logging

Day 1 cycle logging records only the date a period starts. The app counts days elapsed and resets on the next entry. It does not model phase and does not predict.

The reason for including it at all is that cycle timing is a genuine and under-recognised source of structured symptom variation in the conditions this app is most used for. A retrospective analysis of prospectively collected symptom tracking data from 948 users with long COVID, myalgic encephalomyelitis or both found that symptoms worsened around menstruation, and that users of combined hormonal contraception reported a lower overall symptom burden [28]. That analysis is a preprint and has not completed peer review, and it is cited here as an indication of why the field is worth logging rather than as settled evidence.

---

## A note on terminology

"EMA" is ambiguous and worth disambiguating for readers who encounter it in the source material.

**Ecological Momentary Assessment** is the research methodology described in section 2, and is the sense used throughout this document.

**Exponential moving average** is a smoothing technique weighted towards recent values, and is not used anywhere in symetric. Baselines use a rolling median, which disregards a single extreme day rather than continuing to be pulled by it with diminishing weight over time.

---

## References

1. Stone AA, Schneider S, Smyth JM. Evaluation of pressing issues in ecological momentary assessment. *Annual Review of Clinical Psychology*. 2023;19(1):107-131. doi:10.1146/annurev-clinpsy-080921-083128

2. Horwitz AG, Zhao Z, Sen S. Peak-end bias in retrospective recall of depressive symptoms on the PHQ-9. *Psychological Assessment*. 2023;35(4):378-381. doi:10.1037/pas0001219

3. Burton C, Dawes H, Goodwill S, Thelwell M, Dalton C. Within and between-day variation and associations of symptoms in Long Covid: intensive longitudinal study. *PLOS ONE*. 2023;18(1):e0280343. doi:10.1371/journal.pone.0280343

4. Wrzus C, Neubauer AB. Ecological momentary assessment: a meta-analysis on designs, samples, and compliance across research fields. *Assessment*. 2023;30(3):825-846. doi:10.1177/10731911211067538

5. Tate AD, Fertig AR, de Brito JN, Ellis JM, Carr CP, Trofholz A, et al. Momentary factors and study characteristics associated with participant burden and protocol adherence: ecological momentary assessment. *JMIR Formative Research*. 2024;8:e49512. doi:10.2196/49512

6. Andreoli G, Rafanelli C, Hofmann SG, Casu G. A systematic scoping review of fully idiographic network analysis in mental health. *Cognitive Therapy and Research*. 2025;50(4):727-749. doi:10.1007/s10608-025-10674-2

7. Cerit M, Lee AY, Hancock J, Miner A, Cho M, Muise D, et al. Person-specific analyses of smartphone use and mental health: intensive longitudinal study. *JMIR Formative Research*. 2025;9:e59875. doi:10.2196/59875

8. Natesan Batley P, McClure EB, Brewer B, Contractor AA, Batley NJ, Hedges LV, et al. Evidence and reporting standards in N-of-1 medical studies: a systematic review. *Translational Psychiatry*. 2023;13:263. doi:10.1038/s41398-023-02562-8

9. Mason TB, Dolgon-Krutolow A, Lee D, Knight TK, Lee R, Herzig SE, et al. Ecological momentary assessment of physical symptoms among patients with a history of COVID-19 infection: towards understanding long covid and the role of mental health symptoms. *Psychology & Health*. 2026:1-17. doi:10.1080/08870446.2025.2612038

10. Cai H, Wang S, Zou R, Li F, Zhang J, Wang Y, et al. Diagnostic value of diurnal variability of orthostatic heart rate increment in children and adolescents with POTS. *Frontiers in Pediatrics*. 2021;9:644461. doi:10.3389/fped.2021.644461

11. Zeron-Rugerio MF, Zaragoza MC, Domingo JC, Sanmartin-Sentanes R, Alegre-Martin J, Castro-Marrero J, et al. Sleep and circadian rhythm alterations in myalgic encephalomyelitis/chronic fatigue syndrome and post-COVID fatigue syndrome and its association with cardiovascular risk factors: a prospective cohort study. *Chronobiology International*. 2024;41(8):1104-1115. doi:10.1080/07420528.2024.2380020

12. Sultson H, Murd C, Havik M, Konstabel K. Negative affect instability predicts elevated depressive and generalized anxiety disorder symptoms even when negative affect intensity is controlled for: an ecological momentary assessment study. *Frontiers in Psychology*. 2024;15:1371115. doi:10.3389/fpsyg.2024.1371115

13. Sperry SH, Yocum AK, McInnis MG. Mood instability metrics to stratify individuals and measure outcomes in bipolar disorder. *Nature Mental Health*. 2024;2(9):1111-1119. doi:10.1038/s44220-024-00291-5

14. Poetar C, Nistor A. Ecological momentary assessment of emotion dysregulation in attention-deficit/hyperactivity disorder: a systematic review. *Psychiatric Quarterly*. 2026. doi:10.1007/s11126-026-10291-6

15. Drexl K, Ralisa V, Rosselet-Amoussou J, Wen CK, Urben S, Plessen KJ, et al. Readdressing the ongoing challenge of missing data in youth ecological momentary assessment studies: meta-analysis update. *Journal of Medical Internet Research*. 2025;27:e65710. doi:10.2196/65710

16. Haines TP, Beare R, Srikanth V. Research Note: re-examining the issue of false positives (statistical type 1 errors) in the era of big data and high-frequency health measurement technologies. *Journal of Physiotherapy*. 2023;69(4):278-282. doi:10.1016/j.jphys.2023.08.003

17. Birk RH, Samuel G. Digital phenotyping for mental health: reviewing the challenges of using data to monitor and predict mental health problems. *Current Psychiatry Reports*. 2022;24(10):523-528. doi:10.1007/s11920-022-01358-9

18. Lewis KJS, Tilling K, Gordon-Smith K, Saunders KEA, Di Florio A, Jones L, et al. The dynamic interplay between sleep and mood: an intensive longitudinal study of individuals with bipolar disorder. *Psychological Medicine*. 2023;53(8):3345-3354. doi:10.1017/S0033291721005377

19. Mansoubi M, Richards T, Ainsworth-Wells M, Fleming R, Leveridge P, Shepherd C, et al. Understanding symptom clusters, diagnosis and healthcare experiences in myalgic encephalomyelitis/chronic fatigue syndrome and long COVID: a cross-sectional survey in the UK. *BMJ Open*. 2025;15(4):e094658. doi:10.1136/bmjopen-2024-094658

20. Halverson CM, Cao S, Perkins SM, Francomano CA. Comorbidity, misdiagnoses, and the diagnostic odyssey in patients with hypermobile Ehlers-Danlos syndrome. *Genetics in Medicine Open*. 2023;1(1):100812. doi:10.1016/j.gimo.2023.100812

21. Seeley M, Wilson G, Ong E, Langdon A, Chieng J, Bailey D, et al. Symptom burden, quality of life, and diagnostic journey of people with postural orthostatic tachycardia syndrome, Australia, 2021-24: a descriptive patient registry data study. *Medical Journal of Australia*. 2025;223(3):159-160. doi:10.5694/mja2.52710

22. Guardado S, Karampela M, Isomursu M, Grundstrom C. Use of patient-generated health data from consumer-grade devices by health care professionals in the clinic: systematic review. *Journal of Medical Internet Research*. 2024;26:e49320. doi:10.2196/49320

23. Bruckner S, Sadare O, Fesl S, Scheibe M, Lang C, Gilbert S. Attitudes of healthcare professionals and researchers toward wearable and app derived patient generated health data. *npj Digital Medicine*. 2025;8:186. doi:10.1038/s41746-025-01568-4

24. Anderson M, van Kessel R, Wood E, Stokes A, Fistein J, Porter I, et al. Understanding factors impacting patient-reported outcome measures integration in routine clinical practice: an umbrella review. *Quality of Life Research*. 2024;33(10):2611-2629. doi:10.1007/s11136-024-03728-7

25. Bonsel JM, Itiola AJ, Huberts AS, Bonsel GJ, Penton H. The use of patient-reported outcome measures to improve patient-related outcomes: a systematic review. *Health and Quality of Life Outcomes*. 2024;22:101. doi:10.1186/s12955-024-02312-4

26. Tangari G, Ikram M, Ijaz K, Kaafar MA, Berkovsky S. Mobile health and privacy: cross sectional study. *BMJ*. 2021;373:n1248. doi:10.1136/bmj.n1248

27. Alfawzan N, Christen M, Spitale G, Biller-Andorno N. Privacy, data sharing, and data security policies of women's mHealth apps: scoping review and content analysis. *JMIR mHealth and uHealth*. 2022;10(5):e33735. doi:10.2196/33735

28. Goodship A, Preston R, Hicks JT, Getreu N, O'Neill H, Leeming H, et al. Digital health app data reveals an effect of ovarian hormones on long COVID and myalgic encephalomyelitis symptoms. *medRxiv* [preprint]. 2025. doi:10.1101/2025.01.24.25321092

---

*This document describes the general approach as currently implemented. Exact thresholds and implementation detail are available on request for clinicians or researchers who need them for a specific clinical or validation purpose. Contact us via [the support page](/support).*
