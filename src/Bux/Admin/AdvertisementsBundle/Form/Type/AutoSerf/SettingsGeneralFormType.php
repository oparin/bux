<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/23/15
 * Time: 4:11 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SettingsGeneralFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\AutoSerf
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
            ))
//            ->add('maxDescription', 'integer', array(
//                'required'  => false,
//            ))
            ->add('clickInDay', 'checkbox', array(
                'label'     => 'One click per IP every 24 hours? (For each ad)',
                'required'  => false,
            ))
            ->add('priceMinute', 'text', array(
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\AdvertisementsBundle\Entity\AutoSerfGeneralSettings',
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