# Resume Data

The entire frontend is data-driven. Instead of hardcoding text into HTML, the UI pulls from a central configuration file.

## Data Source
**File:** `resume/resume-data.json`

## Data Structure
The JSON object contains the following root fields:

- **`name`** (String): Your full name.
- **`title`** (String): Your professional title.
- **`contact`** (Object): Contains `email`, `location`, `github`, and `linkedin`.
- **`summary`** (String): A short professional bio displayed in the Hero section.
- **`skills`** (Object): Categorized arrays of technical skills:
  - `languages` (Array of Strings)
  - `web` (Array of Strings)
  - `tools` (Array of Strings)
- **`education`** (Object): Contains `degree`, `institution`, and `year`.
- **`projects`** (Array of Objects): The most important array. Each object represents a project card.

### Project Object Schema
```json
{
  "title": "String",
  "description": "String",
  "techStack": ["String", "String"],
  "link": "URL String"
}
```

## How Data is Loaded
1. On `DOMContentLoaded`, `scripts/main.js` calls `fetch('../resume/resume-data.json')`.
2. It parses the JSON.
3. It maps over the `projects` array and constructs HTML strings for the Project Cards.
4. It extracts unique values from `techStack` to dynamically build the Filter buttons.
5. It reads `education` and `skills` to construct the interactive Timeline.

## How to Update Resume Information
Simply open `resume/resume-data.json` and edit the text. Upon refreshing the page, the website will automatically reflect the changes. Adding a new object to the `projects` array will automatically render a new card and update the filter buttons.
