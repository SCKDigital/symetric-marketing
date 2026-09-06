---
title: "The science behind symetric"
description: "What symetric measures, how the numbers behind the report are calculated, what published evidence supports each design decision, and what the app deliberately does not claim."
label: "A reference for clinicians"
---

<!--
  ARCHIVED, not a live page. This file lives outside src/content/pages/ on
  purpose, so it's kept on file but never picked up by the content
  collection or built as a route.

  This is the full-detail methodology document: exact thresholds, exact
  statistical implementation (the Pearson r / p-value method, the priority
  score weight table, every constant in one place), verified against the
  real app source on 2026-08-21. Replaced on the live /for-clinicians page
  by a generalised version after a product-marketing audit found it was
  disclosing reproducible implementation detail (the exact weight table,
  the algorithm internals, the constants reference) with little added
  clinical trust value over a qualitative description of the same rigour.

  Keep this version for: a clinician who requests full methodology
  directly, any future peer-review or clinical-validation submission, and
  as the source of truth if the live page's claims ever need re-verifying
  against implementation.

  See src/content/pages/for-clinicians.md for the live, generalised copy.
-->

A patient of yours may have sent you this page, or handed you a symetric report at an appointment. This document sets out what the app measures, how the numbers behind the report are calculated, what published evidence supports each design decision, and what the app deliberately does not claim.

Every threshold quoted below is taken directly from the current implementation rather than approximated. Citations are numbered and listed in full at the end. Where clinical evidence is cited, it has been drawn from the populations who actually use this app: ADHD, autism, mood disorders, POTS, ME/CFS, long COVID and hypermobility spectrum disorders.

**The one sentence version:** symetric runs no machine learning and no population level medical models. Everything it detects is a personal baseline comparison, computed with textbook statistics, over data the patient logged about themselves. Nothing is inferred from other people's data, and nothing constitutes a diagnosis.

---

## 1. What the app measures

Everything logged is self reported, on a schedule the patient sets rather than one the app imposes.

**Mind domains.** Up to eight (mood, energy, anxiety, concentration, irritability, social depletion, sensory overwhelm, motivation). Patients select between two and eight to track. Logged several times a day, at roughly 20 to 30 seconds per check in.

**Sleep.** Logged once daily regardless of which mind domains are selected: a subjective sleep quality rating plus an optional hours slept figure.

**Body domains (optional).** Six symptom domains (fatigue, pain, joint instability, orthostatic symptoms, gut symptoms, end of day exhaustion) and six loggable events (joint subluxation, presyncope episode, migraine onset, crash, reaction, injury), for patients who opt in.

**Day 1 cycle logging (optional).** The date a period starts, and nothing else. The app counts days since that date and resets on the next entry. It does not estimate cycle phase and does not predict a next date.

**Medication and intervention markers.** Dose changes, therapy starts and other life events, logged as dated markers on the same timeline as the symptom data rather than in a separate log.

---

## 2. Why frequent check ins rather than one retrospective form

The design follows Ecological Momentary Assessment (EMA), the research methodology of repeated real time sampling of a person's state in their own environment, close to the moment it occurs, rather than asking them to reconstruct it later from memory [1].

The problem this addresses is well characterised. Retrospective symptom recall is systematically distorted rather than merely noisy: recall of depressive symptoms on the PHQ-9 is disproportionately weighted towards peak and most recent experiences rather than towards the true average across the recall window [2]. The distortion compounds in conditions where the symptoms themselves are unstable. Intensive longitudinal sampling in long COVID found substantial variation in core symptoms both within a single day and between days [3], which means a patient asked to summarise the last three months is being asked to average a quantity that has no stable value, under time pressure, from memory. This is the instrument a consultation defaults to when nothing better is available.

EMA is not free of trade offs, and its validity is conditional on design [1]. The dominant constraint is participant burden: across research fields, compliance falls as instruments lengthen and as per prompt effort rises [4], and momentary state itself predicts adherence, so the patients whose data would be most informative are often the least able to sustain a heavy protocol [5]. This is why the very short check in is load bearing rather than a matter of convenience. If a check in is long enough that patients batch fill several at the end of the day, momentary data silently reverts to recalled data and the methodological advantage is lost.

**Implementation.** Check ins are scheduled several times per day, at a user configurable frequency, inside a user chosen active window set during onboarding. Each is prompted in the moment. Check in windows are timezone aware and carry a defined rescue window rather than a hard cut off, so a late entry is neither silently dropped nor miscounted.

---

## 3. Personal baselines, not population norms

Every deviation the app flags is relative to that patient's own history. There is no population norm, no age or sex adjusted reference range, and no externally sourced cut off anywhere in the system. There is no concept of "normal"; only "normal for this person, recently".

This is a deliberate alignment with the idiographic tradition in intensive longitudinal research, which has grown substantially over the last decade in response to a recurring finding: relationships estimated across a population frequently fail to describe any particular individual within it [6,7]. The same logic underpins N-of-1 methodology, where the individual is the unit of analysis and each patient serves as their own control [8].

**Computation.**

- Baseline is the **median** of a domain's scores over the trailing 30 days, requiring at least 14 distinct days and 14 non-null scores within that window.
- Median rather than mean, deliberately. A mean is dragged by a single severe flare day; a median largely ignores it. In populations where day to day symptom variability is high and a very bad day is a routine rather than exceptional event, this matters. Within person variability in fatigue, pain, dizziness and cognitive symptoms is substantial and well documented in long COVID [3], and momentary sampling in people with a history of COVID-19 infection detects real world ache and fatigue attributable to long COVID rather than to baseline mental health [9]. A measure of central tendency that is sensitive to single extreme values will misrepresent that population's typical state.
- A dispersion measure (population standard deviation) is computed alongside the median but is not currently surfaced anywhere in the product.
- Baselines are recalculated weekly, client triggered on app open rather than by a background job. A baseline may therefore be up to about seven days stale for an active user and arbitrarily stale for an inactive one. This is a documented and accepted trade off rather than a defect.
- **Precedence.** A patient's first baseline for each domain comes from their own self rating during onboarding. Once 14 or more days of real check in data exist, the rolling median takes over. The onboarding value is retained for history but is no longer used.

---

## 4. The core primitive: flagging a deviated day

Almost everything downstream, including sustained patterns, volatility and cycling, begins from the same per day, per domain check:

1. Take that day's average score for the domain (the mean of however many check ins landed that day).
2. Compare it to a **short term baseline**: the median of the last 14 days of that domain's own history where sufficient recent history exists, otherwise falling back to the longer run baseline described in section 3, or to a hardcoded default of 5 (3 for sleep) if neither exists yet.
3. If the absolute difference between today's value and the baseline is 2 points or more on the 1 to 10 scale, that day is flagged as elevated or depressed for that domain.

Everything in section 5 is a different way of asking what shape the flagged days make.

---

## 5. Pattern types and their thresholds

| Pattern | Requirement |
|---|---|
| **Sustained deviation** | 3 or more consecutive flagged days, same domain, same direction |
| **Intraday volatility** | Same day swing of 4 or more points across that day's check ins (maximum minus minimum) |
| **Rapid cycling** (mood only, currently) | 3 or more direction switches within a 7 day rolling window, each swing 2 or more points from baseline |
| **Circadian time of day pattern** | 30 or more check ins for that domain, spanning 3 or more weeks and 10 or more distinct days, with the highest and lowest time block averages differing by 2.0 points or more |

Four points are worth stating precisely.

**Severity** for a sustained deviation or rapid cycling pattern is streak length (or switch count) multiplied by mean deviation magnitude. It is a duration weighted magnitude score. It is not a clinical severity scale of any kind and should not be read as one.

**Circadian blocks are relative, not clock time.** Morning, midday, afternoon and evening are the patient's own active window divided into four equal quarters. A patient whose window runs 06:00 to 14:00 and one whose window runs 12:00 to 22:00 receive differently timed blocks. This keeps the comparison meaningful for that person's actual day rather than assuming a common schedule.

The rationale for examining time of day at all is empirical, and in these populations it is unusually stark. In POTS, the orthostatic heart rate increment itself varies markedly by time of day: in one paediatric cohort, 100% of patients met the diagnostic criterion when tested in the morning, compared with 44.2% in the afternoon and 27.9% in the evening [10]. A patient's symptom report is subject to the same effect. In ME/CFS and post-COVID fatigue syndrome, prospective study of sleep and rhythm parameters shows altered circadian organisation relative to controls [11]. A patient asked at a single clinic appointment how their symptoms are will therefore give an answer partly determined by the hour at which they were asked, and a report that shows the shape of their day carries information a single reading cannot.

**Intraday and day to day instability is treated as a finding in its own right**, not as noise around a mean. Instability in negative affect predicts depressive and generalised anxiety symptoms even after controlling for the intensity of that affect, meaning the fluctuation carries information the average does not [12]. In bipolar disorder, mood instability metrics derived from repeated sampling stratify individuals and track outcomes independently of episode based measures [13]. In ADHD, a systematic review of momentary sampling studies found emotion dysregulation to be reliably observable as within day fluctuation and related to functional impairment, in a way that trait level questionnaire ratings do not capture [14].

**A streak survives missed check in days**, provided that the days which do have data continue to fall on the same side of the flag. A day with no data is skipped rather than treated as a return to baseline. This is a deliberate trade off, since missed logging should not silently erase a real pattern, and it means streak length is not identical to calendar duration. The data quality gate described in section 6 exists specifically to catch cases where this trade off would otherwise admit a sparse and unreliable streak.

---

## 6. Data quality gating: patterns can be rejected, not only detected

Before any pattern is written to the database it must clear a coverage check. If it does not, it is discarded entirely. The app does not display a pattern it is not confident actually occurred.

| Pattern | Rejected if | Quality tiers once accepted |
|---|---|---|
| Sustained deviation | Coverage below 40% of expected check ins, or fewer than 1.5 check ins per day on average | Solid at 75% coverage and 2 per day; Partial at 50%; Limited at 40 to 49% |
| Rapid cycling | Data on fewer than 5 of the 7 window days, or any gap exceeding 2 consecutive missing days | Solid at 85% coverage; Partial otherwise |
| Circadian | Fewer than 30 total check ins, fewer than 10 distinct days, less than 3 weeks of span, or any populated time block with fewer than 5 points | Solid only; anything below the floor is rejected outright rather than downgraded |

This is the most consequential design decision in the product from a clinical safety standpoint, and it is the one with the clearest evidential justification. Missing data in EMA is not missing at random. A recent meta-analysis update covering 285 samples and more than 17,000 participants found compliance averaging around 72%, declining over time, and varying systematically with participant characteristics and study design, such that non-response is itself informative and biases naive analyses [15]. Compliance also declines as protocols lengthen and intensify [4], and is predicted by momentary stress and low mood [5]. In a fatiguing illness this is not a marginal effect: data density falls exactly when symptoms are worst, which is exactly when the data would matter most.

symetric responds to this by suppressing rather than reporting. A pattern that is real but under-logged is withheld, not shown with a lower confidence label. The tier assigned (Solid, Partial or Limited) is internal, is never displayed as a raw percentage, and does two things: it can prevent a pattern surfacing at all, and it discounts that pattern's priority score if it is shown.

---

## 7. Connections between domains

This is the only place the app runs inferential statistics rather than descriptive comparisons.

- **Pearson's r** is computed the standard way, as the covariance of two series divided by the product of their standard deviations.
- **A genuine p value accompanies it.** The implementation includes the regularised incomplete beta function, via a Lentz continued fraction expansion with a Lanczos approximation for the log gamma function it depends on, to compute the two tailed significance of r against Student's t distribution with n minus 2 degrees of freedom. This is the same test a standard statistical package would run, not a bespoke heuristic.
- **Reporting thresholds.** A minimum of 14 overlapping data points, absolute r of 0.6 or greater, **and** p of 0.05 or less. Below any of these the pair is treated as showing no detectable relationship.
- **Confidence tiers.** Absolute r of 0.7 or greater with p of 0.01 or less is reported as "clear". Anything meeting the base threshold but not this is reported as "tentative".
- **Consistency tracking.** A detected connection is flagged as consistent if the same domain pair showed the same direction and a similar magnitude of r, within 0.15, in the previous 30 day window. This is a lightweight replication check across time within one person's own data.

**The raw r and p values are never shown to the patient.** This is an explicit rule in the code rather than an oversight. The interface surfaces only a qualitative direction, such as "tend to move together", and a confidence label.

The reasoning here is worth spelling out, because it is the point at which self tracking tools most often overreach. High frequency health measurement generates a very large number of testable pairwise relationships, and the resulting multiplicity means that conventional significance thresholds applied naively will produce false positives at a rate that is easy to underestimate and easy to present as discovery [16]. Separately, digital phenotyping and digital mental health measures have a documented record of poor replicability and inconsistent reporting, such that no digital marker for mood disorders is currently validated for clinical use [17]. Withholding r and p is a direct response to both problems. It avoids a lay reader misreading a correlation coefficient as a percentage or a probability, and it avoids presenting what is a threshold gated pattern in one person's self reported history with the visual authority of a clinical measurement.

**Two correlation grains are kept deliberately separate.** Mind domain pairs are correlated on raw, same day check ins, using multiple readings per day rather than daily averages, because they share that intraday granularity. Body domains are logged once daily, so body by mind and body by body pairs are correlated on daily averages in a separate detector. This prevents the two methods producing two different numbers for what should be the same underlying relationship.

---

## 8. Sleep is handled differently, on purpose

Rather than correlating a continuous sleep score against a domain, sleep uses a **mean difference comparison**: the average domain score on good sleep days (felt rested rating of 4 or more) against poor sleep days (rating of 2 or less), requiring at least 21 sleep logs overall and at least 5 days in each group, and flagging the domain as affected by sleep if the two group averages differ by 1.5 points or more.

This is a two group comparison rather than a correlation because the clinical question is naturally binary. The question a patient and clinician actually want answered is whether this symptom is worse after a bad night, not how linearly it tracks sleep quality across its full range.

The evidence for directionality is stronger in some of these populations than others, and the product's language reflects that. In bipolar disorder, intensive longitudinal sampling shows sleep and mood influencing one another dynamically, with sleep change carrying prospective information about mood state [18]. In ME/CFS and post-COVID fatigue syndrome, prospective study confirms disrupted sleep and altered circadian organisation as consistent features of the conditions [11], but published momentary sampling work has not yet established whether prior night sleep predicts next day symptom severity in these conditions specifically. symetric therefore presents the sleep comparison as an association observed within that patient's own data, not as a causal claim, and the interface language is chosen accordingly.

The **elevated energy despite poor sleep** marker is worth noting separately. Reduced need for sleep, as distinct from insomnia, is a recognised feature of hypomanic and manic states and one of the more reliable prodromal signals detectable by repeated self report [13,18]. Where the app detects energy elevated above baseline on days following poor sleep, that combination is weighted upwards for display. It is a named differential marker, not a generic threshold crossing, and it is a prompt for clinical attention rather than an assertion about aetiology.

---

## 9. Why multi-domain patterns are shown first

The app applies a priority score to decide the **order** in which detected patterns are displayed. It is important to be exact about what this is and is not.

**What it is:** a deterministic, fully inspectable, hand authored weighted formula.

| Factor | Weight effect |
|---|---|
| Pattern touches 3 or more domains | +1.5 |
| Pattern touches 2 domains | +0.8 |
| Sustained deviation of 21 or more days | +1.2 (14 or more days: +0.8; 7 or more days: +0.4) |
| Ongoing, not yet resolved | +0.5 |
| Intraday swing of 7 or more points | +1.0 (5 or more: +0.5) |
| Rapid cycling | +1.3 |
| Energy elevated despite poor sleep | +1.5 |
| Improved with sleep | +0.6 |
| Severity score | Multiplies the running total, normalised around 1.0 at severity of about 5, capped at three times |
| Partial data quality | Multiplied by 0.8 |
| Limited data quality | Multiplied by 0.6 |

The rationale for weighting multi-domain co-occurrence more heavily is ordinary differential reasoning rather than statistical inference. A shift appearing across several systems at once is more likely to reflect something worth a clinician's attention than an isolated single domain fluctuation. This is the same intuition behind attending to a cluster of symptoms rather than any one in isolation, and it maps onto a well documented problem in exactly these conditions: presentations that span multiple systems are the ones most often missed or delayed.

In myalgic encephalomyelitis and long COVID, patients report symptom burden spanning multiple physiological systems alongside prolonged and adversarial diagnostic pathways [19]. In hypermobile Ehlers-Danlos syndrome, the mean time to diagnosis exceeded ten years, with patients accumulating multiple prior misdiagnoses along the way, and pain and fatigue being the symptoms that most commonly initiated the search [20]. An Australian POTS registry covering 2021 to 2024 recorded a comparable picture: high multi-system symptom burden, substantial quality of life impact, and a protracted diagnostic journey [21]. Surfacing cross-system co-occurrence first is an attempt to put the clinically interesting shape at the top of the page rather than burying it under whichever single domain happens to have moved most.

**What it is not:** this is not machine learned feature importance, and it makes no claim that any domain is medically more important than another in general. It is arithmetic operating only on patterns already detected by the rules in sections 5 to 8. It never decides whether a pattern exists, only how patterns are ordered once they do. Nothing in it is trained on outcomes, on other users, or on anything beyond the table above.

---

## 10. What this can and cannot tell you

This section is stated as plainly in the product as it is here.

**Nothing here is a diagnosis, a risk score, or a clinical measurement.** Every threshold above is a pattern matching rule applied to one person's own recent history. The rules are set conservatively, and the data quality gates exist specifically to suppress unreliable patterns rather than display them anyway.

**Correlation is not causation**, and the product does not imply otherwise. The interface language is deliberately non-causal, and the underlying coefficients are withheld precisely so they cannot be mistaken for something more definitive than they are [16,17].

**All of it depends on logging adherence.** A pattern that is real but under-logged is suppressed by the gates in section 6 rather than shown with false confidence. symetric is therefore tuned to under-report rather than over-report. This is the correct failure direction for a tool that may end up in a consultation, but it does mean that sparse loggers will see fewer patterns rather than lower confidence ones. Given what is known about differential attrition in momentary sampling [15], an absence of findings should not be read as an absence of symptoms, particularly in a fatiguing illness where the worst periods are the least likely to be logged.

**Everything is single subject.** There is no comparison against other users, no population baseline and no epidemiological data anywhere in the pipeline. Every figure in a symetric report is computed from, and compared against, that one patient's logged history.

**Clinicians are not obliged to take the report at face value, and should not.** A systematic review of how health care professionals actually use patient generated health data from consumer grade devices found that its value in the clinic depends heavily on whether the provenance and completeness of the data are legible to the reader, and that unexplained or unqualified figures are the main reason such data is discounted [22]. Surveyed professionals are broadly positive about app derived data whilst consistently naming reliability, interpretability and workflow fit as the conditions for using it [23]. symetric's response is the design described throughout this document: every pattern is shown with the evidence behind it, the underlying rules are published rather than proprietary, and findings resting on insufficient data are withheld rather than qualified.

**The app is not a substitute for clinical judgement**, and the report is not a clinical instrument. Its intended function is closer to that of a structured symptom diary: giving the consultation a legible, dated, self reported record in place of unaided recall. Structured patient reported data used this way has a reasonable evidence base for improving symptom detection and the quality of clinician and patient communication, whilst the evidence for direct effects on clinical outcomes remains more mixed and implementation dependent [24,25].

---

## 11. Where the computation runs, and how data is handled

All of the calculation described above happens on the patient's device. No data is sent to a language model or to any third party for interpretation.

Entries are stored in an encrypted, per account database, access isolated so that no other user and no unauthenticated request can reach them. Nothing is sold, shared or used for advertising.

This is not a trivial commitment in context. A cross sectional analysis of 20,991 mHealth apps found that 88% contained code capable of collecting user data, with the majority of collection operations routing to third parties, and fewer than half of observed data transmissions matching the app's own stated privacy policy [26]. In women's health apps specifically, a scoping review found that only 70% displayed a privacy policy at all and 13% began collecting data before obtaining consent [27]. Clinicians assessing whether to recommend any symptom tracking tool should treat data handling as a first order question rather than a footnote, and the answer should be checkable rather than asserted.

Check ins also carry an edit count and an edit timestamp, so a revised entry remains distinguishable from the original. This matters for anyone reading the record as evidence.

---

## 12. A note on optional cycle logging

Day 1 cycle logging records only the date a period starts. The app counts days elapsed and resets on the next entry. It does not model phase and does not predict.

The reason for including it at all is that cycle timing is a genuine and under-recognised source of structured symptom variation in the conditions this app is most used for. A retrospective analysis of prospectively collected symptom tracking data from 948 users with long COVID, myalgic encephalomyelitis or both found that symptoms worsened around menstruation, and that users of combined hormonal contraception reported a lower overall symptom burden [28]. That analysis is a preprint and has not completed peer review, and it is cited here as an indication of why the field is worth logging rather than as settled evidence.

---

## Reference: every constant in one place

| Constant | Value |
|---|---|
| Deviation flag threshold | 2 or more points from baseline |
| Sustained deviation streak | 3 or more consecutive flagged days |
| Intraday volatility swing | 4 or more points, same day |
| Rapid cycling switches | 3 or more in a 7 day window |
| Circadian range threshold | 2.0 or more points, highest against lowest block |
| Circadian minimum data | 30 or more check ins, 10 or more days, 3 or more weeks span, 5 or more points per populated block |
| Rolling baseline window | 30 days, minimum 14 days and 14 scores |
| Correlation minimum overlap | 14 paired data points |
| Correlation reporting threshold | absolute r of 0.6 or more, and p of 0.05 or less |
| Correlation "clear" confidence | absolute r of 0.7 or more, and p of 0.01 or less |
| Correlation consistency tolerance | change in absolute r of 0.15 or less against prior window |
| Sleep effect group minimums | 21 or more sleep logs; 5 or more days per group (2 or more for the in-cluster check) |
| Sleep effect threshold | 1.5 point group difference or more |
| Sustained deviation coverage floor | 40% coverage or more, 1.5 check ins per day or more |
| Rapid cycling coverage floor | 5 of 7 days with data, no gap exceeding 2 days |

---

## A note on terminology

"EMA" is ambiguous and worth disambiguating for readers who encounter it in the source material.

**Ecological Momentary Assessment** is the research methodology described in section 2, and is the sense used throughout this document.

**Exponential moving average** is a smoothing technique weighted towards recent values. It is **not** used anywhere in symetric. Baselines use a rolling median. The distinction is behavioural, not cosmetic: a median disregards a single extreme day, whereas an exponential moving average would continue to be pulled by it, with diminishing weight over time.

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

*This document describes the implementation as currently built. If the implementation changes, this document should be re-checked against source rather than relied upon on its own.*
