<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/26/14
 * Time: 4:23 PM
 */

namespace Bux\Admin\HomeBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AdminPermissionsFormType
 *
 * @package Bux\Admin\HomeBundle\Form\Type
 */
class AdminPermissionsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('permissionOne', 'checkbox', array(
                'required'  => false,
//                'data'      => true,
            ))
            ->add('permissionTwo', null, array(
                'required'  => false,
//                'data'      => true,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Bux\Admin\HomeBundle\Entity\AdminPermission',
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'admin_home_admin_permissions_form_type';
    }
}