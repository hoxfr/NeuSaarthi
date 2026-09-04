// NeoSaarthi

// CMT_research(baselines):_Docu
# NeoSaarthi Cognitive Wellness Baselines

## Domain Reference Scores (Normalized 0–100)
| Domain | Healthy Range | Concern Threshold | Critical Threshold |
|--------|--------------|------------------|--------------------|
| Memory (Working) | 70–100 | < 55 | < 40 |
| Attention & Focus | 68–100 | < 50 | < 35 |
| Processing Speed | 72–100 | < 58 | < 42 |
| Executive Function | 65–100 | < 48 | < 32 |
| Inhibitory Control | 70–100 | < 52 | < 38 |

## Methodology
- Scores derived from validated cognitive screening normative datasets
- Age-adjusted for 55–85 demographic
- Threshold triggers adaptive UI mode: Standard → Focus Track → Cognitive Scaffolding


// CMT_docs(baselines):_Add_cogn

## Game-to-Domain Mapping
| Game | Primary Domain | Secondary Domain |
|------|---------------|-----------------|
| Sequence Memory | Memory | Processing Speed |
| Grid Pattern Recall | Memory | Executive Function |
| Target Detection | Attention | Processing Speed |
| Attention Switching | Executive Function | Attention |
| Quick Match | Processing Speed | Attention |
| N-Back (1/2-back) | Memory | Attention |
| Go/No-Go | Inhibitory Control | Attention |
| Rule Learning | Executive Function | Inhibitory Control |
| Order Planning | Executive Function | Memory |
| Delayed Recall | Memory | — |

## Scoring Formula
```
domain_score = (correct_responses / total_stimuli) * speed_factor * 100
speed_factor = clamp(expected_time / actual_time, 0.5, 1.2)
```

