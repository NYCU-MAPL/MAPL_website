# Publication author links

Author names and their order remain in `src/data/publications.json`. The Publications page resolves links at build/load time; it does not search for people in the visitor's browser.

## MAPL members

The resolver reuses `website` from `src/data/members.json`, including alumni. Names tolerate capitalization, spaces, hyphens and diacritics. Initials, surnames and nicknames are not used to infer identities.

When a publication uses a different name order, add an explicit binding in `src/data/author-profiles.json`:

```json
{
  "name": "Nguyen Quang Sang",
  "aliases": ["Sang NguyenQuang"],
  "memberId": "nguyen-quang-sang"
}
```

Do not copy member URLs into this file: `memberId` continues to use the member's current website. A member without a website stays unlinked.

## Authors outside the member directory

Add one central entry with a verified personal academic website or an official individual profile. Check the author's publications or affiliation, especially for common names. Keep the supporting primary source in `sourceUrl`.

```json
{
  "name": "Fan Zhang",
  "website": "https://fan-aaron-zhang.github.io/",
  "sourceUrl": "https://fan-aaron-zhang.github.io/"
}
```

The initial 35 profiles were researched on November 4, 2026. Entries retain the sources used for identification. URLs can change and should be checked when updating content. Avoid search-result pages, guessed domains and automatically generated author directories.

Use `aliases` for verified alternate spellings or name order, not for punctuation variants already covered by normalization. Each global normalized name must be unique. Scoped entries may share a name when their author occurrences do not overlap.

## Same-name authors

If multiple members share an English name, the resolver leaves that name unlinked. It never selects a person just because only one matching member has a website. An explicit `memberId` binding can resolve a name only after confirming that every occurrence refers to that person.

There are two members named Yi-Hsin Chen: Julie (PhD) and Cindy (master's). On November 4, 2026, the site owner supplied two pages of Julie's CV from her LinkedIn profile. Her name, email and education match the member record. The CV confirms 20 publications currently in this repository; these use a publication-specific binding to `yi-hsin-chen`. Signed LinkedIn image URLs expire, so `sourceUrl` retains her stable profile URL instead.

```json
{
  "name": "Yi-Hsin Chen",
  "memberId": "yi-hsin-chen",
  "sourceUrl": "https://www.linkedin.com/in/yihsinchen/",
  "publications": [
    { "id": "motif-video-super-resolution-2023", "authorIndex": 0 }
  ]
}
```

`authorIndex` is zero-based and must match the name at that position in `publications.json`. A scoped binding applies only to those exact occurrences; it does not identify the same name in other papers. MoTIF lists two authors with this name in the [original author list](https://arxiv.org/abs/2307.07988) and the supplied CV: Julie is first, and the other Yi-Hsin Chen is third. The previously omitted third author has been restored and remains unlinked because that member has no website.

Three current papers are not listed in the supplied CV and remain unlinked for this name: **Using Conditional Video Compressors for Image Restoration**, **Rate-Distortion-Complexity Analysis of Parametric Video Codecs**, and **A Cross-Framework Study of Temporal Information Buffering Strategies for Learned Video Compression**. Check additional evidence before adding them to the scoped binding.

## Validation

```sh
npm run check
node --experimental-strip-types --test tests/publication-authors.test.ts
npm run validate:content
```

Content validation checks profile names, unique aliases, member references, HTTPS URLs, external source URLs, and scoped publication/author positions. Unknown or unverified authors remain plain text.
