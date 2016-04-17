<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/3/15
 * Time: 3:09 PM
 */

namespace Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SettingsFormType
 *
 * @package Bux\Admin\SetupBundle\Form\Type\BuyReferralsSettings
 */
class SettingsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('autoAssign', 'checkbox', array(
                'required'  => false
            ))
            ->add('enabled', 'checkbox', array(
                'required'  => false
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\SetupBundle\Entity\BuyReferralsSettings',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'settings_form_type';
    }
}