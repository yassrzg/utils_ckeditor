<?php

declare(strict_types = 1);

namespace Drupal\utils_ckeditor\Plugin\CKEditor5Plugin;

use Drupal\ckeditor5\Plugin\CKEditor5PluginDefault;
use Drupal\ckeditor5\Plugin\CKEditor5PluginDefinition;
use Drupal\Component\Transliteration\TransliterationInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\editor\EditorInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Callout base plugin class.
 */
abstract class UtilsCkeditor extends CKEditor5PluginDefault implements ContainerFactoryPluginInterface {

  /**
   * The key to store multiple groups in form state.
   */
  public const MULTIPLE_GROUPS_KEY = 'utils_ckeditor_multiple_groups';

  /**
   * The default configuration for this plugin.
   *
   * @var string[][]
   */
  public const DEFAULT_CONFIGURATION = [
    'enabled_utils_ckeditor' => [],
  ];

  /**
   * The transliteration service.
   *
   * @var \Drupal\Component\Transliteration\TransliterationInterface
   */
  protected TransliterationInterface $transliteration;

  /**
   * The CKEditor5 config key.
   *
   * @var string
   */
  protected string $ckeditor5ConfigKey;

  /**
   * Constructor.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param \Drupal\ckeditor5\Plugin\CKEditor5PluginDefinition $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Component\Transliteration\TransliterationInterface $transliteration
   *   The transliteration service.
   */
  public function __construct(
    array $configuration,
    string $plugin_id,
    CKEditor5PluginDefinition $plugin_definition,
    TransliterationInterface $transliteration
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->transliteration = $transliteration;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): self {
    // @phpstan-ignore-next-line
    return new static(
      $configuration,
      $plugin_id,
      // @phpstan-ignore-next-line
      $plugin_definition,
      $container->get('transliteration')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return self::DEFAULT_CONFIGURATION;
  }

  /**
   * {@inheritdoc}
   */
  public function getElementsSubset(): array {
    return $this->configuration['enabled_utils_ckeditor'] ?? [];
  }

  /**
   * {@inheritdoc}
   */
  public function getDynamicPluginConfig(array $static_plugin_config, EditorInterface $editor): array {
    $config = $static_plugin_config;
    $enabled_callouts = $this->configuration['enabled_utils_ckeditor'];

    foreach ($enabled_callouts as $utils) {
      $config[$this->ckeditor5ConfigKey]['options'][] = [
        'id' => $utils,
        'label' => $this->t('Utils_ckeditor @utils_ckeditor', ['@utils_ckeditor' => ucfirst($utils)]),
      ];
    }

    return $config;
  }
}
