import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    subheadline: Schema.Attribute.Text;
  };
}

export interface BlocksHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_slide';
  info: {
    description: 'Individual hero carousel slide with optional link';
    displayName: 'Hero Slide';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    linkUrl: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    subheadline: Schema.Attribute.Text;
  };
}

export interface SharedAchievementItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_achievement_items';
  info: {
    displayName: 'Achievement';
  };
  attributes: {
    description: Schema.Attribute.Text;
    level: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.Integer;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    description: 'SEO meta fields';
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Statistic item';
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.hero': BlocksHero;
      'blocks.hero-slide': BlocksHeroSlide;
      'shared.achievement-item': SharedAchievementItem;
      'shared.cta': SharedCta;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
    }
  }
}
