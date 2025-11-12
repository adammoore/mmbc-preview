# MMBC News Management Guide

This guide explains how to add and update news items on the MMBC website homepage.

## Where to Find News Items

News items are displayed on the homepage (`index.html`) in the "Latest News" section (around line 160-210).

## Adding a New News Item

### Step 1: Open index.html

Locate the news section which looks like this:

```html
<section class="news-section" aria-labelledby="news-heading">
    <div class="container">
        <h2 id="news-heading" class="section-heading">Latest News</h2>
        <div class="news-grid">
            <!-- News items go here -->
        </div>
    </div>
</section>
```

### Step 2: Add Your News Item

Copy and paste this template inside the `<div class="news-grid">` section:

```html
<!-- News Item - [Brief Description] -->
<article class="news-item">
    <div class="news-date">
        <span class="news-day">DD</span>
        <span class="news-month">MMM</span>
        <span class="news-year">YYYY</span>
    </div>
    <div class="news-content">
        <h3 class="news-title">Your News Title Here</h3>
        <p class="news-excerpt">Write your news content here. Keep it concise - 2-3 sentences is ideal. Explain what happened or what's coming up.</p>
        <a href="events.html" class="news-link">Learn More →</a>
    </div>
</article>
```

### Step 3: Fill in the Details

Replace the following:

- **DD** = Day (e.g., 08, 15, 28)
- **MMM** = Month abbreviation (e.g., Jan, Feb, Nov, Dec)
- **YYYY** = Year (e.g., 2024, 2025)
- **Your News Title Here** = A clear, engaging headline
- **Write your news content...** = 2-3 sentences summarizing the news
- **href="events.html"** = Link to relevant page (events.html, gallery.html, membership.html, etc.)
- **Learn More →** = Change the link text if needed (e.g., "View Photos →", "See Events →", "Read More →")

## Complete Example

```html
<!-- News Item - Black Tie Gala Success -->
<article class="news-item">
    <div class="news-date">
        <span class="news-day">08</span>
        <span class="news-month">Nov</span>
        <span class="news-year">2024</span>
    </div>
    <div class="news-content">
        <h3 class="news-title">Black Tie Gala Raises £3,231 for North West Air Ambulance</h3>
        <p class="news-excerpt">MMBC's annual Black Tie Dinner was a spectacular success, raising £3,231 for the North West Air Ambulance Charity. The evening featured a three-course meal, live entertainment from singer Gemma Louise Doyle, and a cheque presentation to NWAA representative Anne.</p>
        <a href="gallery.html" class="news-link">View Photos →</a>
    </div>
</article>
```

## Best Practices

### Keep News Fresh
- Display 3-4 most recent news items
- Remove or archive old news (older than 6 months) to keep content current
- Order news items with newest first (top of the grid)

### Writing Tips
- **Headlines**: Keep them clear and under 80 characters
- **Content**: 2-3 sentences, around 150-200 characters
- **Dates**: Use the actual date the event happened or when announced
- **Links**: Always link to a relevant page where users can learn more

### Content Ideas
- Event announcements (upcoming rallies, social events)
- Event recaps (photos and highlights from past events)
- Charity fundraising results
- Club achievements or milestones
- New member welcomes
- Facility improvements or maintenance updates
- Important club notices

## Quick Reference: Common Link Destinations

- **Events**: `events.html` - For event announcements
- **Gallery**: `gallery.html` - For photo galleries
- **Membership**: `membership.html` - For membership news
- **Moorings**: `moorings.html` - For mooring updates
- **Contact**: `contact.html` - For general enquiries

## Ordering News Items

The news grid displays items in the order they appear in the HTML. To control the display order:

1. **Most recent first** = Place at the top of the news-grid
2. **Older items** = Place below newer items
3. **Archive old items** = Remove from index.html or save to a separate file

## Need Help?

If you need assistance updating news items:
- Contact: Sharron Brown (Social Secretary) - social@mmbc.co.uk
- Website queries: FAIR Research Consultancy & Management - fairresconman.com

## Technical Notes

The news section uses CSS Grid for responsive layout:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

All styling is handled automatically by the `css/styles.css` file - you only need to update the HTML content.
