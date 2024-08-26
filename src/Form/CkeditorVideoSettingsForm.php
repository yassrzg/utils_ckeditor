<?php

namespace Drupal\utils_ckeditor\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Class CkeditorVideoSettingsForm.
 */
class CkeditorVideoSettingsForm extends EntityForm {

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $entity->id(),
      '#machine_name' => [
        'exists' => [$this, 'exists'],
      ],
      '#disabled' => !$entity->isNew(),
    ];

    $form['host_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t("Nom de l'host"),
      '#description' => $this->t('Ajouter le nom de l\'hôte.'),
      '#default_value' => $entity->get('host_name'),
      '#required' => TRUE,
    ];

    $form['host_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t("L'URL du host"),
      '#description' => $this->t('L\'URL doit commencer par http:// ou https://.'),
      '#default_value' => $entity->get('host_url'),
      '#required' => TRUE,
    ];

    return $form;
  }

  public function exists($entity_id, array $element, FormStateInterface $form_state) {
    $result = $this->entityTypeManager->getStorage($this->entity->getEntityTypeId())
      ->getQuery()
      ->condition($this->entity->getEntityType()->getKey('id'), $entity_id)
      ->execute();

    return (bool) $result;
  }

  public function buildEntity(array $form, FormStateInterface $form_state) {
    $entity = parent::buildEntity($form, $form_state);

    $formValues = $form_state->getValues();

    if (isset($formValues['host_name']) && isset($formValues['host_url'])) {
      $entity->set('id', $formValues['id']);
      $entity->set('host_name', $formValues['host_name']);
      $entity->set('host_url', $formValues['host_url']);
    }

    return $entity;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
    $host_url = $form_state->getValue('host_url');

    if (substr($host_url, 0, 7) !== 'http://' && substr($host_url, 0, 8) !== 'https://') {
      $form_state->setErrorByName('host_url', $this->t("L'URL doit commencer par http:// ou https://"));
    }
  }

  /**
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function save(array $form, FormStateInterface $form_state) {
    $status = $this->entity->save();
    if ($status == SAVED_UPDATED) {
      $this->messenger()->addMessage($this->t("%host_name à été mis à jour.", ['%host_name' => $this->entity->id()]));
    } else {
      $this->messenger()->addMessage($this->t("%host_name à été ajouté.", ['%host_name' => $this->entity->id()]));
    }

    // Ensure the 'id' parameter is included in the redirect URL
    $form_state->setRedirect('utils_ckeditor.host_video.display');

    return $status;
  }

}
