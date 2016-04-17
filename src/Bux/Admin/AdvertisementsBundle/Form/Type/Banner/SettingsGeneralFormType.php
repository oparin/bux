<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/19/15
 * Time: 5:53 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Banner;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SettingsGeneralFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Banner
 */
class SettingsGeneralFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('enabled', 'checkbox', array(
                'label'     => 'Banner ads Enable?',
                'required'  => false,
            ))
            ->add('adminApprove', 'checkbox', array(
                'label'     => 'Require Admin Approval?',
                'required'  => false,
            ))
            ->add('autoCredits', 'checkbox', array(
                'label'     => 'Auto-assign credits after member purchases',
                'required'  => false,
            ))
            ->add('maxTitle', 'integer', array(
                'required'  => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\AdvertisementsBundle\Entity\BannerGeneralSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'settings_general_form_type';
    }
}