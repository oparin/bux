<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/21/15
 * Time: 1:50 PM
 */

namespace Bux\Admin\AdvertisementsBundle\Form\Type\Poll;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SettingGeneralFormType
 *
 * @package Bux\Admin\AdvertisementsBundle\Form\Type\Poll
 */
class SettingGeneralFormType extends AbstractType
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
            ->add('maxDescription', 'integer', array(
                'required'  => false,
            ))
            ->add('transferPeriod', 'integer', array(
            ))
            ->add('clickInDay', 'checkbox', array(
                'label'     => 'One click per IP every 24 hours? (For each ad)',
                'required'  => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\AdvertisementsBundle\Entity\PollGeneralSettings',
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