<?php

namespace Drupal\utils_ckeditor\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\Core\Entity\Annotation\ConfigEntityType;

/**
 * Defines the Video entity.
 *
 * @ConfigEntityType(
 *   id = "host_video",
 *   label = @Translation("Host Video"),
 *   handlers = {
 *     "list_builder" = "Drupal\utils_ckeditor\Controller\Ckeditor5HostConfigController",
 *   "form" = {
 *    "add" = "Drupal\utils_ckeditor\Form\CkeditorVideoSettingsFormAdd",
 *    "edit" = "Drupal\utils_ckeditor\Form\CkeditorVideoSettingsFormEdit",
 *    "delete" = "Drupal\utils_ckeditor\Form\CkeditorVideoSettingsFormDelete",
 *    },
 *   },
 *   config_prefix = "host_video",
 *   admin_permission = "administer site configuration",
 *   entity_keys = {
 *      "id" = "id",
 *      "label" = "host_name",
 *      "uuid" = "uuid",
 *   },
 *   links = {
 *      "canonical" = "/admin/config/content/ckeditor/utils_ckeditor/config_video/{host_video}",
 *      "edit-form" = "/admin/config/content/ckeditor/utils_ckeditor/config_video/{host_video}/edit",
 *      "delete-form" = "/admin/config/content/ckeditor/utils_ckeditor/config_video/{host_video}/delete",
 *    },
 *   config_export = {
 *   "id",
 *   "host_name",
 *   "host_url",
 *   },
 *
 * )
 */

class HostVideo extends ConfigEntityBase {

  /**
   * The Video ID.
   *
   * @var string
   */
  public $id;

  /**
   * The Video host name.
   *
   * @var string
   */
  public string $host_name;

  /**
   * The Video host URL.
   *
   * @var string
   */
  public string $host_url;

}


